import { Client } from "discord.js";
import { Router, Application } from "express";
import { Discord_Client_Id, Discord_Client_Secret, Express_DOMAIN } from "../../Config";
import fetch from "node-fetch";
import OAuth2 from "../Struct/Oauth2";
import AW from "../../Lib/AW";

export default class Oauth2Router
{
    private server: Application;
    private client: Client; 
    private oauth: OAuth2;
    private router = Router();

    constructor(server: Application, client: Client, oauth: OAuth2)
    {
        this.server = server;
        this.client = client;
        this.oauth = oauth;

        this.server.use("/oauth2", this.router);

        this.router.get("/discord", (req, res) => {
            let callbackURL = `${Express_DOMAIN}/oauth2/discord/callback`;
            let discord_uri = `https://discord.com/oauth2/authorize?client_id=${Discord_Client_Id}&redirect_uri=${encodeURIComponent(callbackURL)}&response_type=code&scope=${encodeURIComponent("identify guilds")}`

            return res.redirect(discord_uri);
        });

        this.router.get("/discord/callback", async (req, res) => {

            const [auth, A_Error] = await AW(fetch("https://discord.com/api/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                //@ts-ignore
                body: new URLSearchParams({
                    "client_id": Discord_Client_Id,
                    "client_secret": Discord_Client_Secret,
                    "grant_type": "authorization_code",
                    "code": req.query.code,
                    "redirect_uri": `${Express_DOMAIN}/oauth2/discord/callback`,
                    "scope": "identify"
                })
            }));

            if(!auth || A_Error)
            {
                return res.redirect("/");
            }

            let token = (await auth.json())["access_token"];
            req.session.discord_token = token;
            res.redirect("/");
        });
    }
}