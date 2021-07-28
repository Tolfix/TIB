require("dotenv").config();
import Check from "./Check";
import Mongo_Database from "./Database/Mongo";
import DiscordClient from "./Discord/Discord";

Check();

new DiscordClient();
new Mongo_Database();