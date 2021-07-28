import { Client } from "discord.js";
import { Router, Application } from "express";
import { Discord_Client_Id, Discord_Client_Secret, Express_DOMAIN, Github_Client_Id, Github_Client_Secret } from "../../Config";
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
            let discord_uri = `https://discord.com/oauth2/authorize?client_id=${Discord_Client_Id}&redirect_uri=${encodeURIComponent(callbackURL)}&response_type=code&scope=${encodeURIComponent("identify guilds guilds.join email")}`

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

        this.router.get("/github", (req, res) => {
            let github_uri = `https://github.com/login/oauth/authorize?client_id=${Github_Client_Id}&scope=${encodeURIComponent("user:email read:user")}`
            return res.redirect(github_uri);
        });

        this.router.get("/github/callback", async (req, res) => {
            let url = `https://github.com/login/oauth/access_token?client_id=${Github_Client_Id}&client_secret=${Github_Client_Secret}&code=${req.query.code}`
            const [auth, A_Error] = await AW(fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json"
                },
            }));

            if(!auth || A_Error)
            {
                return res.redirect("/");
            }

            const token = (await auth.json())["access_token"];

            req.session.github_token = token;
            return res.redirect("/");
        });

    }
}