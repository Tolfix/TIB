import { CronJob } from "cron";
import CacheClient from "../Cache/Cache";
import Logger from "../Lib/Logger";

export default function ReCache()
{
    // Every hour
    new CronJob("0 * * * *", () => {
        Logger.info(`Re Caching..`)
        CacheClient.CacheGithub().then(() => {
            CacheClient.CacheUsers().then(() => {
                Logger.info(`Re Caching done.`);
            });
        });
    }, null, true, "Europe/Stockholm");
}