import { Client } from "discord.js";
import { Request } from "express";
import fetch from "node-fetch"
import { APIUser } from "../../Interfaces/Discord/APIUser";
import { Github_APIUser } from "../../Interfaces/Github/APIUser";

export default class OAuth2 {
    protected guilds: object | any;
    protected client: Client;

    public constructor(client: Client) {
        this.client = client;
        this.guilds = new Object();
    }

    public async Discord_resolveInformation(req: Request): Promise<APIUser> {
        
        if (!req.session.discord_token) {
            //@ts-ignore
            return null;
        }

        const userReq = await fetch("https://discord.com/api/users/@me", {
            headers: {
                "Authorization": `Bearer ${req.session.discord_token}`
            }
        })

        const user = await userReq.json();

        if(!user.id) {
            //@ts-ignore
            return null;
        } 

        if(!this.guilds[user.id]) {
            const guildReq = await fetch("https://discord.com/api/users/@me/guilds", {
                headers: {
                    "Authorization": `Bearer ${req.session.discord_token}}`
                }
            })

            const guildsRes = await guildReq.json();

            if(guildsRes.code !== 0)
            {
                this.guilds[user.id] = guildsRes;
            }

            setTimeout(() => {
                delete this.guilds[user.id];
            }, 3e5)
        }

        return {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
            email: user.email,
        }
    }

    public async Github_resolveInformation(req: Request): Promise<Github_APIUser>
    {
        if(!req.session.github_token)
        {
            //@ts-ignore
            return null
        }

        const user = await fetch(`https://api.github.com/user`, {
            method: "GET",
            headers: {
                authorization: `token ${req.session.github_token}`
            }
        });

        const email = await fetch(`https://api.github.com/user/emails`, {
            method: "GET",
            headers: {
                authorization: `token ${req.session.github_token}`
            }
        });

        let user_data = await user.json();
        let email_data = ((await email.json() as Array<any>).filter(e => e.primary))[0];

        return Promise.resolve({
            email: email_data.email,
            github_id: user_data.id
        })
    }
}