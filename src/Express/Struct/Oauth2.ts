import { Client } from "discord.js";
import { Request } from "express";
import fetch from "node-fetch"
import { APIUser } from "../../Interfaces/APIUser";

export default class OAuth2 {
    protected guilds: object | any;
    protected client: Client;

    public constructor(client: Client) {
        this.client = client;
        this.guilds = new Object();
    }

    public async resolveInformation(req: Request): Promise<APIUser> {
        
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
            guilds: this.guilds[user.id]?.map((guild: any) => {
                const g = this.client.guilds.cache.get(guild.id);
                return {
                    id: guild.id,
                    name: guild.name,
                    icon: guild.icon,
                    //@ts-ignore
                    admin: g ? g.members.cache.get(user.id).permissions.has("ADMINISTRATOR") : guild.owner,
                    invited: g ? true : false
                }
            }),
            avatar: user.avatar,
            admin: false,
        }
    }
}