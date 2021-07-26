import { Client } from "discord.js";
import { Discord_Token } from "./Config";

const client = new Client();

client.on("ready", () => {
    client.user?.setPresence({

        status: "dnd",

        activity: {
            type: "STREAMING",
            name: "TIB"
        }

    })
});

client.login(Discord_Token);