import { Client } from "discord.js";
import { Router, Application } from "express";
import bodyParser from "body-parser";
import OAuth2 from "../Struct/Oauth2";
import AW from "../../Lib/AW";
import CacheClient from "../../Cache/Cache";
import log from "../../Lib/Logger";
import simpleGithub from "simple-webhook-github";
import { Github_Secrets_Sponsorship } from "../../Config";
import SponsorModel from "../../Database/Schemes/Sponsors";

export default class WebhookRouter
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

        const webhookSponsor = new simpleGithub(this.server, {
            secret: Github_Secrets_Sponsorship,
            endpoint: "/webhook/github/sponsors"
        });

        webhookSponsor.listen("sponsorship", (sponsor) => {
            if(sponsor.action === "created")
            {
                const id = sponsor.sponsorship.sponsor.id;
                const tier = sponsor.sponsorship.tier;

                new SponsorModel({
                    github_id: id,
                    tier: tier
                }).save();

                // New cache for sponsors
                CacheClient.Sponsor.set(id, {
                    github_id: id,
                    tier: tier
                });
            }
        });

        this.server.use("/webhook", this.router);

        // this.router.post("/github/sponsors", bodyParser.raw({type: 'application/json'}), (req, res) => {
        //     log.info(`A new sponsorship`);

        //     const body = req.body;
        //     const sponsor = body.sponsor;

        //     if(!sponsor)
        //         return log.error(`No sponsor found!`);

        //     const sponsor_id = sponsor.id as number;
        //     const tier = body.tier;
            


        //     res.sendStatus(200);
        // });
    }
}