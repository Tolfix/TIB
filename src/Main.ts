require("dotenv").config();
import CacheClient from "./Cache/Cache";
import Check from "./Check";
import Mongo_Database from "./Database/Mongo";
import DiscordClient from "./Discord/Discord";
import log from "./Lib/Logger";

Check();

new Mongo_Database();

log.info(`Caching..`)
CacheClient.CacheGithub().then(() => {
    CacheClient.CacheUser().then(() => {
        log.info(`Caching done.`);
        new DiscordClient();
    });
});

