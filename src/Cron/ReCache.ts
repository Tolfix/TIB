import { CronJob } from "cron";
import CacheClient from "../Cache/Cache";
import log from "../Lib/Logger";

export default function ReCache()
{
    // Every day at midnight
    new CronJob("0 0 * * *", () => {
        log.info(`Re Caching..`)
        CacheClient.CacheGithub().then(() => {
            CacheClient.CacheUsers().then(() => {
                log.info(`Re Caching done.`);
            });
        });
    }, null, true, "Europe/Stockholm");
}