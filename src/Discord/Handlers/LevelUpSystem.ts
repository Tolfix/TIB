import { Message } from "discord.js";
import CacheClient from "../../Cache/Cache";
import Logger from "../../Lib/Logger";

export default function LevelUpSystem(message: Message): void
{
    const author = message.author;
    const cache = CacheClient.DiscordUserLevel.get(author.id);

    if(!cache)
    {
        CacheClient.DiscordUserLevel.set(author.id, {
            discord_id: author.id,
            level: "1",
            xp: 0,
        });
        return;
    }

    // Logic now ;(
    
    let amountOfMessagesToNextLeveL = 10;
    let xp = cache.xp;
    let level = cache.level;
    let newXp = xp+1;

    if(newXp % amountOfMessagesToNextLeveL === 0)
    {
        Logger.discord(`User ${author.username} (${author.id}) leveled up`);
        level = (parseInt(level)+1).toString();
        message.react("✔");
    }

    // GiveUserRoleIfLevelUp

    CacheClient.DiscordUserLevel.set(author.id, {
        discord_id: author.id,
        level: level,
        xp: newXp
    });

    return;
}