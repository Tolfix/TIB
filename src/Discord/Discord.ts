
import { Client } from "discord.js";
import { Discord_Token, Prefix } from "../Config";
import ExpressClient from "../Express/Express";

export default class DiscordClient
{
    private client: Client;

    constructor()
    {
        this.client = new Client();

        new ExpressClient(this.client);

        this.client.on("ready", () => {
            this.client.user?.setPresence({

                activity: {
                    type: "WATCHING",
                    name: `TIB | ${Prefix}help`
                }

            })
        });

        this.client.login(Discord_Token);
    }

}