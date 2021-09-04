import { MessageButton } from "discord-buttons";
import { Guild, GuildMember } from "discord.js";
import { TextChannel } from "discord.js";
import { Client } from "discord.js";
import { ApplicationCommandInteractionDataOption, Interaction } from "slash-commands";
import SlashReply from "../../../Lib/Discord/SlashReply";
import Slash from "../../Struct/Slash";

export default class TicketSetup extends Slash
{
    public name = "ticket-setup";
    public options = {
        "name": this.name,
        "description": "Creates a setup for ticket system",
        "options": [
            {
                "type": 7,
                "name": "channel",
                "description": "The channel",
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

        let channelId = args?.[0].value as string;
        
        let channel = guild.channels.cache.get(channelId) as TextChannel;
            
        // Create button in channel
        channel.send(`Click for ticket support`, {
            button: new MessageButton().setStyle("green").setID(`create_ticket`).setLabel(`Ticket Support`).setEmoji(`✉`),
        });

        return await sr.reply(`Created ticket button!`, {ephemeral: true});
    }
}