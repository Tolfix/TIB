import { MessageComponent } from "discord-buttons";

export default abstract class Button
{
    abstract id: string; 
    abstract run(button: MessageComponent): void;
} 