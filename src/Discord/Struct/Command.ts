import { Message } from "discord.js";
import { Client } from "discord.js";

export default abstract class Command
{
    abstract name: string;
    abstract description: string;
    abstract usage: string; 
    abstract run(client: Client, message: Message, args: string[]): void;
} 