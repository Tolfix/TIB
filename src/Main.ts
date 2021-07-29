require("dotenv").config();
import CacheClient from "./Cache/Cache";
import Check from "./Check";
import Mongo_Database from "./Database/Mongo";
import DiscordClient from "./Discord/Discord";

Check();

CacheClient.CacheGithub().then(() => {
    CacheClient.CacheUser()
});

new DiscordClient();
new Mongo_Database();