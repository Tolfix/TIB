require("dotenv").config();
import CacheClient from "./Cache/Cache";
import Check from "./Check";
import CronHandler from "./Cron/CronHandler";
import Mongo_Database from "./Database/Mongo";
import DiscordClient from "./Discord/Discord";
import log from "./Lib/Logger";

Check();
CronHandler();

new Mongo_Database();

log.info(`Caching..`)
CacheClient.CacheGithub().then(() => {
    CacheClient.CacheUsers().then(() => {
        log.info(`Caching done.`);
        new DiscordClient();
    });
});

