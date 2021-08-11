import Slash from "../../Struct/Slash";
import { Guild, GuildMember, MessageEmbed } from "discord.js";
import { Client } from "discord.js";
import { ApplicationCommandInteractionDataOption, Interaction } from "slash-commands";
import SlashReply from "../../../Lib/Discord/SlashReply";
import CacheClient from "../../../Cache/Cache";
import { Color_Main } from "../../../Config";
import { getUserBanner } from "discord-banner";
import Logger from "../../../Lib/Logger";

export default class UserBannerSlash extends Slash
{
    public name = "user-banner";
    public options = {
        "name": this.name,
        "description": "Shows user banner",
        "options": [
            {
              "type": 6,
              "name": "user",
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
        let banner;

        if(args)
        {
            banner = (await getUserBanner(args[0]?.value as string)).url;
        }

        if(!args)
        {
            banner = await author.user.bannerURL();
        }

        const embed = new MessageEmbed()
            .setTitle(`${author.user.username} banner`)
            .setColor(Color_Main)

        if(!banner)
        {
            embed.setDescription(`User has no banner`);
            embed.setColor((await author.user.banner).color ?? Color_Main);
        }

        if(banner)
            embed.setImage(banner);

        sr.reply(embed);
    }
}