import Slash from "../../Struct/Slash";
import { Guild, GuildMember, MessageEmbed } from "discord.js";
import { Client } from "discord.js";
import { ApplicationCommandInteractionDataOption, Interaction } from "slash-commands";
import SlashReply from "../../../Lib/Discord/SlashReply";
import CacheClient from "../../../Cache/Cache";
import { Color_Main, Discord_Sponsor_Role_Id } from "../../../Config";
import UserModel from "../../../Database/Schemes/User";
import Github_GetUserEmail from "../../../Lib/Github/GetUserEmail";

export default class AddSponsorSlash extends Slash
{
    public name = "add-sponsor";
    public options = {
        "name": this.name,
        "description": "Adds a sponsor",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "The user to add as sponsor",
                "required": true
            },
            {
                "type": 3,
                "name": "github",
                "description": "Github id or name",
                "required": true
            }
        ]
    }
    public async run(
        client: Client,
        interaction: Interaction,
        author: GuildMember,
        guild: Guild,
        args: ApplicationCommandInteractionDataOption[] | undefined,
        sr: SlashReply
    )
    {
        // Check if user got permission to do this.
        if(!author.hasPermission(`ADMINISTRATOR`))
            return sr.reply(`You don't have the permisison to do this.`);
        
        //@ts-ignore
        let userId = (args?.filter(e => e.type === 6))[0].value as string;
        //@ts-ignore
        let github = (args?.filter(e => e.type === 3))[0].value as string;

        let CachedUser = CacheClient.User.get(parseInt(github));
        // Check if user already linked.
        if(CachedUser && userId === CachedUser.discord_id)
        {
            CachedUser.sponsor = true;
            CacheClient.User.set(parseInt(github), CachedUser);
            // Add role
            //@ts-ignore
            (guild.member(client.users.resolve(userId))?.roles.add(guild.roles.cache.find(e => e.id === Discord_Sponsor_Role_Id)));
            return sr.reply(`Done!`);
        }

        let userEmail = await Github_GetUserEmail(parseInt(github));
        // Assuming not linked
        // Linking them
        new UserModel({
            discord_id: userId,
            github_id: parseInt(github),
            github_email: userEmail,
            email: userEmail,
            sponsor: true
        }).save();

        CacheClient.User.set(parseInt(github), {
            discord_id: userId,
            github_id: parseInt(github),
            github_email: userEmail,
            email: userEmail,
            sponsor: true,
            contributedTo: CacheClient.ContributedTo(parseInt(github)),
        });
        //@ts-ignore
        (guild.member(client.users.resolve(userId))?.roles.add(guild.roles.cache.find(e => e.id === Discord_Sponsor_Role_Id)));
        return sr.reply(`Done!`);
    }
}