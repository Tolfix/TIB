import fetch from "node-fetch";
import { Github_API, Github_Client_Id, Github_Client_Secret, Github_Org } from "../Config";
import UserModel from "../Database/Schemes/User";
import { IC_Sponsor } from "../Interfaces/Cache/Cache_Sponsor";
import { IC_User } from "../Interfaces/Cache/Cache_User";
import { Contributor } from "../Interfaces/Github/Contributors";
import { Repository } from "../Interfaces/Github/Repository";
import { IUser, IUserSchema } from "../Interfaces/Database/Users";
import Logger from "../Lib/Logger";
import { ISponsor } from "../Interfaces/Github/Sponsor";
import { ISponsorSchema } from "../Interfaces/Database/Sponsor";
import SponsorModel from "../Database/Schemes/Sponsors";
import { Contribution } from "../Interfaces/Github/Contribution";
    
export const User = new Map<IC_User, IUser>();
export const Sponsor = new Map<IC_Sponsor, ISponsor>();
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
    let contributedto: Contribution[] = [];
            
    for (const [key, value] of Respositories.entries()) {
        if(value.contributors.length > 0)
        {
            for(const contributor of value.contributors)
            {
                if(contributor.author.id === userId)
                {
                    contributedto.push({
                        name: value.name,
                        owner: value.owner,
                        contributed: contributor
                    });
                }
            }
        }
    }

    return contributedto
}

async function CacheSponsor(sponsor: ISponsorSchema)
{
    Logger.cache(`Caching sponsor`, sponsor.github_id);
    Sponsor.set(sponsor.github_id, {
        github_id: sponsor.github_id,
        tier: sponsor.tier
    });

    if(!Sponsor.get(sponsor.github_id))
        CacheSponsor(sponsor);
}

async function CacheUser(user: IUserSchema)
{
    Logger.cache(`Caching user | id: `, user.github_id, " | email: ", user.email);
    User.set(user.github_id, {
        discord_id: user.discord_id,
        // discord_email: user.email,
        email: user.email,
        github_email: user.email,
        github_id: user.github_id,
        contributedTo: ContributedTo(user.github_id)
    });

    if(!User.get(user.github_id))
        CacheUser(user);
}

async function CacheSponsors()
{
    SponsorModel.find().then(sponsors => {
        for(const sponsor of sponsors)
        {
            CacheSponsor(sponsor);
        }

        return Promise.resolve(true);
    });
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

        let data = {
            contributors: Contri,
            name: repo.name,
            owner: repo.owner.login
        }

        Logger.cache(`Caching ${repo.name} with value` , data);

        Respositories.set(repo.name, data);
    }
    Promise.resolve(true);
}

const CacheClient = {
    User,
    Sponsor,
    Respositories,
    CacheGithub,
    CacheSponsor,
    CacheSponsors,
    CacheUser,
    CacheUsers,
    ContributedTo,
    getFromDiscordId
}

export default CacheClient