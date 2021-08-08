import { Client } from "discord.js";
import { Discord_Guild_Id, Discord_LevelUp_Roles } from "../../Config";
import Logger from "../../Lib/Logger";

export default function HandleSetup(client: Client)
{

    (client.guilds.cache.get(Discord_Guild_Id))?.roles.cache.array().forEach((role) => {
        if(role.name.startsWith("+"))
        {
            const name = "level "+((role.name.split("|"))[0].replace("+", "")).trim()
            Discord_LevelUp_Roles.set(name, role);
        }
    });
}