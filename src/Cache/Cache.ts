import fetch from "node-fetch";
import { Github_API, Github_Client_Id, Github_Client_Secret, Github_Org } from "../Config";
import UserModel from "../Database/Schemes/User";
import { IC_User } from "../Interfaces/Cache/Cache_User";
import { Contributor } from "../Interfaces/Github/Contributors";
import { Repository } from "../Interfaces/Github/Repository";
import { IUser } from "../Interfaces/Users";
import log from "../Lib/Logger";

export default class CacheClient
{
    
    public User = new Map<IC_User, IUser>();
    public Respositories = new Map<string, Repository>();

    constructor()
    {
        // Cache everything
        log.info(`Caching..`)
        this.CacheGithub().then(async () => {
            // Cache user in database
            this.CacheUser();
        });

    }

    public getFromDiscordId(discord_id: string)
    {
        for (const [key, value] of this.User.entries()) {
            if(value.discord_id === discord_id)
                return key;
        }
    }

    public ContributedTo(userId: number)
    {
        let contributedto: Repository[] = [];
                
        for (const [key, value] of this.Respositories.entries()) {
            for(const contributor of value.contributors)
            {
                if(contributor.author.id === userId)
                {
                    contributedto.push(value);
                }
            }
        }

        return contributedto
    }

    public async CacheUser()
    {
        UserModel.find().then(users => {
            users.forEach(user => {

                this.User.set(user.github_id, {
                    discord_id: user.id,
                    discord_email: user.email,
                    email: user.email,
                    github_email: user.email,
                    github_id: user.github_id,
                    contributedTo: this.ContributedTo(user.github_id)
                });
            });
        });
    }

    public async CacheGithub()
    {
        const secrets = `?client_id=${Github_Client_Id}&client_secret=${Github_Client_Secret}`
        // console.log(Buffer.from(`${Github_Client_Id}:${Github_Client_Secret}`, 'base64').toString("base64"))
        // Get all of our repos
        const Repos = await (await fetch(`${Github_API}orgs/${Github_Org}/repos${secrets}`, {
            headers: {
                authorization: `Basic ${Buffer.from(`${Github_Client_Id}:${Github_Client_Secret}`).toString("base64")}`
            }
        })).json() as Array<any>;

        for await(let repo of Repos)
        {
            // Get contributors
            const Contri = await (await fetch(`${Github_API}repos/${Github_Org}/${repo.name}/stats/contributors${secrets}`, {
                headers: {
                    authorization: `Basic ${Buffer.from(`${Github_Client_Id}:${Github_Client_Secret}`).toString("base64")}`
                }
            })).json() as Array<Contributor>

            this.Respositories.set(repo.name, {
                contributors: Contri,
                name: repo.name,
                owner: repo.owner.login
            });
        }
        Promise.resolve(true);
    }
}