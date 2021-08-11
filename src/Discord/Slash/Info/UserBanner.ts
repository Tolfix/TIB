import Slash from "../../Struct/Slash";
import { Guild, GuildMember, MessageEmbed } from "discord.js";
import { Client } from "discord.js";
import { ApplicationCommandInteractionDataOption, Interaction } from "slash-commands";
import SlashReply from "../../../Lib/Discord/SlashReply";
import CacheClient from "../../../Cache/Cache";
import { Color_Main } from "../../../Config";

export default class UserBannerSlash extends Slash
{
    public name = "user-banner";
    public options = {
        "name": this.name,
        "description": "Shows user banner",
        "options": [
            {
              "type": 6,
              "name": "User",
              "description": "The user",
              "required": false
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
        console.log(args)
        const banner = await author.user.bannerURL();

        const embed = new MessageEmbed()
            .setTitle(`${author.user.username} banner`)
            .setColor(Color_Main)

        if(!banner)
            embed.setDescription(`User has no banner`);

        if(banner)
            embed.setImage(banner);

        sr.reply(embed);
    }
}