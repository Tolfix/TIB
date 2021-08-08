import { CronJob } from "cron";
import CacheClient from "../Cache/Cache";
import DiscordUserLevel from "../Database/Schemes/DiscordUserLevel";
import Logger from "../Lib/Logger";

export default async function SaveToDatabase()
{
    // Every hour
    new CronJob("*/15 * * * *", () => {
        Logger.info(`Saving to database...`);
    
        // Save Discord users level.
        for(const [key, value] of CacheClient.DiscordUserLevel.entries())
        {
            DiscordUserLevel.findOne({ discord_id: value.discord_id }).then((user) => {
                if(!user)
                {
                    new DiscordUserLevel({
                        discord_id: value.discord_id,
                        level: value.level,
                        xp: value.xp
                    }).save();

                    return;
                }

                user.level = value.level
                user.xp = value.xp;

                //@ts-ignore
                user.save();
                return;
            });
        }

    }, null, true, "Europe/Stockholm");
} 