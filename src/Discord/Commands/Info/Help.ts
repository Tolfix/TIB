import { MessageButton } from "discord-buttons";
import { Message } from "discord.js";
import { Client } from "discord.js";
import Command from "../../Struct/Command";

export default class HelpCommand extends Command
{
    public name = "help";
    public description = `Gives user help`;
    public usage = `To help`
    public run(client: Client, message: Message, args: string[])
    {
        let b = new MessageButton().setStyle("blurple").setID("create_ticket").setLabel("Create Ticket")
        message.channel.send("Hello", {
            button: b
        })
    }
}