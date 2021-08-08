import { Role } from "discord.js";
import { Message } from "discord.js";
import { Discord_LevelUp_Roles } from "../../Config";
import { IDiscordUserLevel } from "../../Interfaces/Database/DiscordUserLevel";
import Logger from "../../Lib/Logger";

export default function LevelUpManager(message: Message, author: IDiscordUserLevel)
{
    const userRole = message.member?.roles.cache.array().filter(e => e.name.startsWith("+")) as Role[];

    if(userRole.length === 0)
    {
        // Give user role
        message.member?.roles.add((Discord_LevelUp_Roles.get("level 1") as Role))
        Logger.discord(`Giving user ${author.discord_id} role "level 1"`);
        return;
    }

    const levelRole = Discord_LevelUp_Roles.get(`level ${author.level}`);

    if(!levelRole)
        return;

    // Check if user already has role
    if(userRole.includes(levelRole))
        return;

    message.member?.roles.add((Discord_LevelUp_Roles.get(`level ${author.level}`) as Role))

    return;
};