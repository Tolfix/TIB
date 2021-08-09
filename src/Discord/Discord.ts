import discord, { Client, Collection } from "discord.js";
import { Discord_Token, Prefix } from "../Config";
import API from "../API/API";
import CommandHandler from "./Handlers/CommandHandler";
import Command from "./Struct/Command";
import discord_button, { AwaitMessageButtonOptions, ButtonCollector, MessageActionRow, MessageButton, MessageComponent, MessageMenu } from "discord-buttons";
import ButtonHandler from "./Handlers/ButtonHandler";
import Button from "./Struct/Button";
import Slash from "./Struct/Slash";
import SlashHandler from "./Handlers/SlashHandler";
import GuildMemberAddHandler from "./Handlers/GuildMemberAddHandler";
import Logger from "../Lib/Logger";
import LevelUpSystem from "./Handlers/LevelUpSystem";
import HandleSetup from "./Handlers/HandleSetup";

declare module 'discord.js' 
{
    export interface Client {
      commands: Collection<string, Command>;
      buttons: Collection<string, Button>;
      slash: Collection<string, Slash>;
      category: string[];
    }

    export interface MessageOptions {
        component?: MessageButton | MessageMenu | MessageActionRow;
        components?: MessageActionRow[];
        button?: MessageButton | MessageButton[];
        buttons?: MessageButton | MessageButton[];
        menu?: MessageMenu | MessageMenu[];
        menus?: MessageMenu | MessageMenu[];
    }
    
    export interface MessageEditOptions
    {
        component?: MessageButton | MessageMenu | MessageActionRow;
        components?: MessageActionRow[];
        button?: MessageButton | [MessageButton, ...MessageButton[]];
        buttons?: MessageButton | [MessageButton, ...MessageButton[]];
        menu?: MessageMenu | [MessageMenu, ...MessageMenu[]];
        menus?: MessageMenu | [MessageMenu, ...MessageMenu[]];
    }

    export interface Message {
        components: MessageActionRow[];
        createButtonCollector(filter: CollectorFilter, options?: AwaitMessageButtonOptions): ButtonCollector;
        awaitButtons(filter: CollectorFilter, options?: AwaitMessageButtonOptions): Promise<Collection<Snowflake, MessageComponent>>;
        edit(
            content: APIMessageContentResolvable | MessageEditOptions | MessageEmbed | APIMessage,
            ): Promise<Message>;
        edit(content: StringResolvable, options: MessageEditOptions | MessageEmbed): Promise<Message>;
        edit(content: StringResolvable, options: MessageEditOptions | MessageEmbed | MessageButton | MessageActionRow): Promise<Message>;
        reply(
            content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions,
            ): Promise<Message>;
        reply(options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
        reply(options: MessageOptions | APIMessage): Promise<Message | Message[]>;
        reply(
            content: StringResolvable,
            options: (MessageOptions & { split?: false }) | MessageAdditions,
            ): Promise<Message>;
        reply(
            content: StringResolvable,
            options: MessageOptions & { split: true | SplitOptions },
            ): Promise<Message[]>;
        reply(content: StringResolvable, options: MessageOptions): Promise<Message | Message[]>;
        reply(content: StringResolvable, options: MessageOptions | MessageButton | MessageActionRow): Promise<Message>;
    }

    export interface WebhookClient {
        editMessage(message: string, content: any, options?: {}): Promise<any>;
        deleteMessage(message: string): Promise<void>;
        fetchMessage(message: string, cache?: boolean): Promise<any>;
    }

    export interface PartialTextBasedChannelFields {
        send(content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
        send(options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
        send(options: MessageOptions | discord.APIMessage): Promise<Message | Message[]>;
        send(content: StringResolvable, options: (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
        send(content: StringResolvable, options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
        send(content: StringResolvable, options: MessageOptions): Promise<Message | Message[]>;
        send(content: StringResolvable, options: MessageButton | MessageActionRow | MessageMenu): Promise<Message | Message[]>;
    }
}

declare module "discord-buttons"
{
    export interface InteractionReply {
        client: discord.Client;
        component: MessageComponent;
        webhook: WebhookClient;
        has: boolean;
        isEphemeral: boolean;
        send(content: discord.APIMessageContentResolvable | (ReplyOptions & { split?: false }) | MessageAdditions): Promise<this>;
        send(options: ReplyOptions & { split: true | discord.SplitOptions }): Promise<this[]>;
        send(options: ReplyOptions | discord.APIMessage): Promise<this | this[]>;
        send(content: discord.StringResolvable, options: (ReplyOptions & { split?: false }) | MessageAdditions): Promise<this>;
        send(content: discord.StringResolvable, options: ReplyOptions & { split: true | discord.SplitOptions }): Promise<this[]>;
        send(content: discord.StringResolvable, options: ReplyOptions): Promise<this | this[]>;
        send(content: discord.StringResolvable, options: MessageButton | MessageActionRow | MessageMenu | ReplyOptions): Promise<this | this[]>;
        edit(content: discord.APIMessageContentResolvable | (ReplyOptions & { split?: false }) | MessageAdditions): Promise<this>;
        defer(ephemeral: boolean): Promise<this>;
        think(ephemeral: boolean): Promise<this>;
        fetch(): Promise<any>;
        delete(): Promise<void>;
    }
}

export default class DiscordClient
{
    private client: Client;

    constructor()
    {
        this.client = new Client();

        this.client.commands = new Collection();
        this.client.buttons = new Collection();
        this.client.slash = new Collection();

        new API(this.client);

        CommandHandler(this.client);
        ButtonHandler(this.client);
        SlashHandler(this.client)
        discord_button(this.client);

        this.client.on("ready", () => {
            HandleSetup(this.client);
            Logger.discord(`Discord client ready.`)
            this.client.user?.setPresence({
                status: "dnd",
                activity: {
                    type: "WATCHING",
                    name: `TIB | ${Prefix}help`
                }

            })
        });

        this.client.on("message", (message) => {
            if (message.author.bot) return;
            if (!message.guild) return;
            LevelUpSystem(message);
            if (!message.content.startsWith(Prefix)) return;
    
            const args = message.content.slice(Prefix.length).trim().split(/ +/g);
            const cmd: any = args.shift()?.toLowerCase();
    
            if (cmd.length === 0) return;
            
            let command = (this.client.commands.get(cmd))?.run;
    
            if (command)
            {
                command(
                    this.client,
                    message,
                    args
                );
            };
        });

        this.client.on("clickButton", (button) => {
            let b = (this.client.buttons.get(button.id))?.run;
            if(b)
            {
                b(button);
            }
        });

        this.client.on("guildMemberAdd", (member) => {
            GuildMemberAddHandler(this.client, member);
        });

        this.client.login(Discord_Token);
    }
}