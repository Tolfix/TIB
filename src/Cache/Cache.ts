import fetch from "node-fetch";
import { Github_API, Github_Client_Id, Github_Client_Secret, Github_Org } from "../Config";
import UserModel from "../Database/Schemes/User";
import { IC_User } from "../Interfaces/Cache/Cache_User";
import { Contributor } from "../Interfaces/Github/Contributors";
import { Repository } from "../Interfaces/Github/Repository";
import { IUser, IUserSchema } from "../Interfaces/Users";
import log from "../Lib/Logger";
    
export const User = new Map<IC_User, IUser>();
export const Respositories = new Map<string, Repository>();

function getFromDiscordId(discord_id: string)
{
    for (const [key, value] of User.entries()) {
        if(value.discord_id === discord_id)
            return key;
    }
}

function ContributedTo(userId: number)
{
    let contributedto: Repository[] = [];
            
    for (const [key, value] of Respositories.entries()) {
        log.debug(value)
        if(value.contributors.length > 0)
        {
            for(const contributor of value.contributors)
            {
                if(contributor.author.id === userId)
                {
                    contributedto.push(value);
                }
            }
        }
    }

    return contributedto
}

async function CacheUser(user: IUserSchema)
{
    log.info(`Caching user`, user.github_id, user.email);
    User.set(user.github_id, {
        discord_id: user.discord_id,
        discord_email: user.email,
        email: user.email,
        github_email: user.email,
        github_id: user.github_id,
        contributedTo: ContributedTo(user.github_id)
    });

    if(!User.get(user.github_id))
        CacheUser(user)
}

async function CacheUsers()
{
    UserModel.find().then(users => {
        for(const user of users)
        {
            CacheUser(user)
        }

        return Promise.resolve(true);
    });
}

async function CacheGithub()
{
    // Get all of our repos
    const Repos = await (await fetch(`${Github_API}orgs/${Github_Org}/repos`, {
        headers: {
            authorization: `Basic ${Buffer.from(`${Github_Client_Id}:${Github_Client_Secret}`).toString("base64")}`
        }
    })).json() as Array<any>;
    
    for await(let repo of Repos)
    {
        // Get contributors
        const Contri = await (await fetch(`${Github_API}repos/${Github_Org}/${repo.name}/stats/contributors`, {
            headers: {
                authorization: `Basic ${Buffer.from(`${Github_Client_Id}:${Github_Client_Secret}`).toString("base64")}`
            }
        })).json() as Array<Contributor>

        Respositories.set(repo.name, {
            contributors: Contri,
            name: repo.name,
            owner: repo.owner.login
        });
    }
    Promise.resolve(true);
}

const CacheClient = {
    User,
    Respositories,
    CacheGithub,
    CacheUser,
    CacheUsers,
    ContributedTo,
    getFromDiscordId
}

export default CacheClient