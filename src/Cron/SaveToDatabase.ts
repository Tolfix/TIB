import { CronJob } from "cron";
import CacheClient from "../Cache/Cache";
import DiscordUserLevel from "../Database/Schemes/DiscordUserLevel";
import UserModel from "../Database/Schemes/User";
import Logger from "../Lib/Logger";

export default async function SaveToDatabase()
{
    // Every hour
    new CronJob("*/15 * * * *", () => {
        Logger.info(`Saving to database...`);
    
        // Save Discord users level.
        for(const [key, value] of CacheClient.DiscordUserLevel.entries())
        {
            Logger.cache(`Saving discord user`, value.discord_id)
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

        // Save Users if any changes..
        for(const [key, value] of CacheClient.User.entries())
        {
            Logger.cache(`Saving user`, key);
            UserModel.findOne({ github_id: key }).then((user) => {
                if(!user)
                {
                    new UserModel({
                        discord_id: value.discord_id,
                        github_id: key,
                        email: value.email,
                        github_email: value.github_email,
                        sponsor: value.sponsor,
                    }).save();

                    return;
                }

                user.discord_id = value.discord_id;
                user.github_id = key
                user.email = value.email
                user.github_email = value.github_email
                user.sponsor = value.sponsor

                //@ts-ignore
                user.save();
                return;
            });
        }

    }, null, true, "Europe/Stockholm");
} 