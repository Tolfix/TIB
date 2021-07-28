import { MessageComponent } from "discord-buttons";
import Button from "../../Struct/Button";

export default class TicketButton extends Button
{
    public id = "create_ticket";
    public run(button: MessageComponent)
    {
        // Create a channel etc etc.
        button.reply.send(`Not finished`, {ephemeral: true});
    }
}