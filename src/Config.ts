import { Role } from "discord.js";

/*
*   Discord
*/
export const Discord_Token = process.env.DISCORD_TOKEN ?? "";
export const Discord_Client_Id = process.env.DISCORD_CLIENT_ID ?? "";
export const Discord_Client_Secret = process.env.DISCORD_CLIENT_SECRET ?? "";
export const Discord_Guild_Id = "833438897484595230";
export const Discord_Public_Key = "b7e1889432f44a4f8c88bcacfbfbe145e45a4fe4138fcd24cc1a6b315f000999";
export const Discord_Ticket_Parent_Id = "870276061261336616"
export const Discord_Member_Role_Id = "870570341024542781";
export const Discord_Sponsor_Role_Id = "874986149406453801";
export const Discord_LevelUp_Roles = new Map<string, Role>();
export const Prefix = process.env.PREFIX ?? "tib ";

/*
* Express
*/
export const Express_Port = process.env.EXPRESS_PORT ?? 8080;
export const Express_FQDN = process.env.FQDN ?? `localhost:${Express_Port}`;
export const Express_HTTP: "https" | "http" = process.env.HTTP === "https" ? "https" : "http";
export const Express_DOMAIN = `${Express_HTTP}://${process.env.FQDN ?? `localhost:${Express_Port}`}`;
export const Express_Session_Secret = process.env.EXPRESS_SESSION_SECRET ?? require("crypto").randomBytes(20).toString("hex");

/*
* Database
*/
export const Database_Mongo_URI = process.env.DB_MONGO_URI ?? "mongodb://localhost/tib";

/*
* Github
*/
export const Github_Client_Id = process.env.GITHUB_CLIENT_ID ?? "";
export const Github_Client_Secret = process.env.GITHUB_CLIENT_SECRET ?? "";
export const Github_Secrets_Sponsorship = process.env.GITHUB_SECRETS_SPONSOR ?? "";
export const Github_Org = "Tolfix";
export const Github_API = "https://api.github.com/";

/*
* CDN
*/
export const CDN_TX_Image = "https://cdn.tolfix.com/images/TX-Small.png"

/*
* General
*/
export const HomeDir = ((__dirname.replace("\\build", "")).replace("/build", ""));
export const DebugMode = process.env.DEBUG ?? false;
export const Version = "1.1.7";

/*
 * Colors 
 */
export const Color_Main = "#e1e5f0";
export const Color_Green = "#8fefb1";
export const Color_Purple = "#cf69e9";
export const Color_Pink = "#fde8f3";
