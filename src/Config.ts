/*
*   Discord
*/
export const Discord_Token = process.env.DISCORD_TOKEN ?? "";
export const Discord_Client_Id = process.env.DISCORD_CLIENT_ID ?? "";
export const Discord_Client_Secret = process.env.DISCORD_CLIENT_SECRET ?? "";
export const Discord_Guild_Id = "833438897484595230";
export const Discord_Public_Key = "b7e1889432f44a4f8c88bcacfbfbe145e45a4fe4138fcd24cc1a6b315f000999";
export const Discord_Ticker_Parent_Id = "870276061261336616"
export const Prefix = process.env.PREFIX ?? "tib ";

export const Express_Port = process.env.EXPRESS_PORT ?? 8080;
export const Express_FQDN = process.env.FQDN ?? `localhost:${Express_Port}`;
export const Express_HTTP = process.env.HTTP ?? "http";
export const Express_DOMAIN = `${Express_HTTP}://${process.env.FQDN ?? `localhost:${Express_Port}`}`;
export const Express_Session_Secret = process.env.EXPRESS_SESSION_SECRET ?? require("crypto").randomBytes(20).toString("hex");

export const Database_Mongo_URI = process.env.DB_MONGO_URI ?? "mongodb://localhost/tib";

export const Github_Client_Id = process.env.GITHUB_CLIENT_ID ?? "";
export const Github_Client_Secret = process.env.GITHUB_CLIENT_SECRET ?? "";
export const Github_Org = "Tolfix";
export const Github_API = "https://api.github.com/";

export const HomeDir = ((__dirname.replace("\\build", "")).replace("/build", ""));

export const DebugMode = process.env.DEBUG ?? false;