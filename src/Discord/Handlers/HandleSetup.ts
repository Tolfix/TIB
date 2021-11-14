import { Client } from "discord.js";
import { Discord_Guild_Id, Discord_LevelUp_Roles } from "../../Config";
import Logger from "../../Lib/Logger";

export default function HandleSetup(client: Client)
{

    (client.guilds.cache.get(Discord_Guild_Id))?.roles.cache.array().forEach((role) => {
        if(role.name.startsWith("+"))
        {
            const name = "level "+((role.name.split("|"))[0].replace("+", "")).trim()
            Logger.cache(`Caching role "${name}"`);
            Discord_LevelUp_Roles.set(name, role);
        }
    });

    (client.guilds.cache.get(Discord_Guild_Id))?.members.cache.array().forEach((member) => {
        let memberRole = member.guild.roles.cache.find(e => e.name === "Member");
        if(memberRole)
            if(!member.roles.cache.find(e => e.name === "Member"))
            {
                Logger.discord(`User ${member.id} has no MemberRole, giving role...`);
                member.roles.add(memberRole);
            }
    });
    
}