import { stripIndent } from "common-tags";
import { MessageButton } from "discord-buttons";
import { Guild, GuildMember, MessageEmbed } from "discord.js";
import { TextChannel } from "discord.js";
import { Client } from "discord.js";
import { ApplicationCommandInteractionDataOption, Interaction } from "slash-commands";
import CreateButton from "../../../Lib/Discord/CreateButton";
import SlashReply from "../../../Lib/Discord/SlashReply";
import Slash from "../../Struct/Slash";

export default class TicketSetup extends Slash
{
    public name = "information-setup";
    public options = {
        "name": this.name,
        "description": "Gives general information",
        "options": [
            {
                "type": 7,
                "name": "channel",
                "description": "The channel",
                "required": true
            }
        ]
    }
    public run(
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

        let channelId = args?.[0].value as string;
        
        let channel = guild.channels.cache.get(channelId) as TextChannel;
            
        const embed = new MessageEmbed()
        .setColor("")
        .setFooter("")
        .setThumbnail("https://cdn.tolfix.com/images/TX-Small.png")
        .setTitle("General information")
        .addField("Information", stripIndent`
        Here you can find various of buttons which gives various of information.
        `);

        channel.send(embed, {
            components: [
                CreateButton(
                    {
                        name: "Github",
                        url: "https://github.com/Tolfix"
                    },
                    {
                        name: "Tolfix",
                        url: "https://tolfix.com"
                    },
                    {
                        name: "Link discord/github",
                        emoji: `🔗`,
                        url: "https://tib.tolfix.com/oauth2/link"
                    },
                ),
                CreateButton(
                    {
                        name: "My Contributes",
                        emoji: `🌟`,
                        style: "blurple",
                        id: "user_contributes"
                    }
                )
            ]
        });

        sr.reply(`Finished`);
    }
}