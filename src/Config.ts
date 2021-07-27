/*
*   Discord
*/
export const Discord_Token = process.env.DISCORD_TOKEN ?? "";
export const Discord_Client_Id = process.env.DISCORD_CLIENT_ID ?? "";
export const Discord_Client_Secret = process.env.DISCORD_CLIENT_SECRET ?? "";
export const Prefix = process.env.PREFIX ?? "tib ";

export const Express_Port = process.env.EXPRESS_PORT ?? 8080;
export const Express_FQDN = process.env.FQDN ?? `localhost:${Express_Port}`;
export const Express_HTTP = process.env.HTTP ?? "http";
export const Express_DOMAIN = `${Express_HTTP}://${process.env.FQDN ?? `localhost:${Express_Port}`}`;
export const Express_Session_Secret = process.env.EXPRESS_SESSION_SECRET ?? require("crypto").randomBytes(20).toString("hex");

export const Database_Mongo_URI = process.env.DB_MONGO_URI ?? "mongodb://localhost/tib";

export const DebugMode = process.env.DEBUG ?? false;