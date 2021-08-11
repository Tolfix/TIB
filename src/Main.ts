require("dotenv").config();
import CacheClient from "./Cache/Cache";
import Check from "./Check";
import CronHandler from "./Cron/CronHandler";
import Mongo_Database from "./Database/Mongo";
import DiscordClient from "./Discord/Discord";
import NodeEvents from "./Events/NodeEvents";
import Logger from "./Lib/Logger";

Check();
CronHandler();
NodeEvents()

new Mongo_Database();

Logger.info(`Caching..`);
CacheClient.CacheGithub().then(async () => {

    CacheClient.CacheSponsors();
    CacheClient.CacheDiscordUserLevels();

    CacheClient.CacheUsers().then(() => {
        Logger.info(`Caching done.`);
        new DiscordClient();
    });
});

