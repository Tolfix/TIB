import { MessageComponent } from "discord-buttons";
import { Guild, TextChannel } from "discord.js";
import { Client, GuildMember } from "discord.js";
import { ApplicationCommandInteractionDataOption, Interaction } from "slash-commands";
import SlashReply from "../../Lib/Discord/SlashReply";

// https://rauf.wtf/slash/ <--- good to have :)
export default abstract class Slash
{
    abstract name: string; 
    abstract options: Object;
    abstract run(
        client: Client,
        interaction: Interaction,
        author: GuildMember,
        guild: Guild,
        args: ApplicationCommandInteractionDataOption[] | undefined,
        sr: SlashReply
    ): void;
} 