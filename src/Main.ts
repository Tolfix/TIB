import { Client } from "discord.js";
import { Discord_Token, Prefix } from "./Config";

const client = new Client();

client.on("ready", () => {
    client.user?.setPresence({

        activity: {
            type: "STREAMING",
            name: `TIB | ${Prefix}help`
        }

    })
});

client.login(Discord_Token);