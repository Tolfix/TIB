require("dotenv").config();
import CacheClient from "./Cache/Cache";
import Check from "./Check";
import Mongo_Database from "./Database/Mongo";
import DiscordClient from "./Discord/Discord";

Check();

const Cache = new CacheClient();
new DiscordClient(Cache);
new Mongo_Database();