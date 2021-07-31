import { Client } from "discord.js";
import { Router, Application } from "express";
import { Discord_Client_Id, Discord_Client_Secret, Discord_Guild_Id, Express_DOMAIN, Github_Client_Id, Github_Client_Secret } from "../../Config";
import fetch from "node-fetch";
import OAuth2 from "../Struct/Oauth2";
import AW from "../../Lib/AW";
import UserModel from "../../Database/Schemes/User";
import { IUser, IUserSchema } from "../../Interfaces/Database/Users";
import { API_Error } from "../JSON/Response";
import CacheClient from "../../Cache/Cache";

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

        this.router.get("/link", async (req, res) => {
            if(!req.session.discord_token)
                return res.redirect("/oauth2/discord")

            if(!req.session.github_token)
                return res.redirect("/oauth2/github");

            const discord = await this.oauth.Discord_resolveInformation(req);
            const github = await this.oauth.Github_resolveInformation(req);

            const User = CacheClient.User.get(github.github_id);

            if(User)
            {
                return API_Error("You have already linked your account.")(res);
            }

            // Assuming no user.
            new UserModel(<IUser>{
                discord_id: discord.id,
                discord_email: discord.email,
                email: github.email,
                github_email: github.email,
                github_id: github.github_id,
                contributedTo: undefined,
            }).save();

            CacheClient.User.set(github.github_id, {
                discord_id: discord.id,
                discord_email: discord.email,
                email: github.email,
                github_email: github.email,
                github_id: github.github_id,
                contributedTo: CacheClient.ContributedTo(github.github_id),
            });

            // Adds the user to our discord server.
            (await this.client.guilds.fetch(Discord_Guild_Id)).addMember(discord.id, {
                accessToken: req?.session.discord_token ?? "",
            });

            res.redirect("https://github.com/Tolfix");
        });

        this.router.get("/discord", (req, res) => {
            let callbackURL = `${Express_DOMAIN}/oauth2/discord/callback`;
            let discord_uri = `https://discord.com/oauth2/authorize?client_id=${Discord_Client_Id}&redirect_uri=${encodeURIComponent(callbackURL)}&response_type=code&scope=${encodeURIComponent("identify guilds.join email")}`

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
                return API_Error("Something went wrong, try again later.")(res);
            }

            let token = (await auth.json())["access_token"];
            
            req.session.discord_token = token;

            res.redirect("/oauth2/link");
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
                return API_Error("Something went wrong, try again later.")(res);
            }

            const token = (await auth.json())["access_token"];

            req.session.github_token = token;

            return res.redirect("/oauth2/link");
        });

    }
}