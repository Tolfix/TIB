import fetch from "node-fetch";
import { Github_API, Github_Client_Secret, Github_Org } from "../Config";
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
        // Cache user in database
        this.CacheGithub().then(async () => {
            this.CacheUser();
            setTimeout(() => {
                console.log(this.User)
            }, 5000)
        });

    }

    public async CacheUser()
    {
        UserModel.find().then(users => {
            users.forEach(user => {
                let contributedto: Repository[] = [];
                
                for (const [key, value] of this.Respositories.entries()) {
                    for(const contributor of value.contributors)
                    {
                        console.log(contributor.author.id + " == " +  user.github_id)
                        if(contributor.author.id.toString() === user.github_id)
                        {
                            contributedto.push(value);
                        }
                    }
                }
                
                this.User.set(user.github_id, {
                    discord_id: user.id,
                    discord_email: user.email,
                    email: user.email,
                    github_email: user.email,
                    github_id: user.github_id,
                    contributedTo: contributedto
                });
            });
        });
    }

    public async CacheGithub()
    {
        // Get all of our repos
        const Repos = await (await fetch(`${Github_API}orgs/${Github_Org}/repos`, {
            headers: {
                authorization: `Basic ${Github_Client_Secret}`
            }
        })).json() as Array<any>;
        console.log(Repos)
        for await(let repo of Repos)
        {
            // Get contributors
            const Contri = await (await fetch(`${Github_API}repos/${Github_Org}/${repo.name}/stats/contributors`, {
                headers: {
                    authorization: `Basic ${Github_Client_Secret}`
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