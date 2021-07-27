require("dotenv").config();
import Mongo_Database from "./Database/Mongo";
import DiscordClient from "./Discord/Discord";

new DiscordClient();
new Mongo_Database();