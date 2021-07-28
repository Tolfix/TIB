import { Client, Message } from "discord.js";

export type RunEvent = (
    client: Client,
    message: Message,
    args: string[]
) => void;