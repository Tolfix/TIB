import { MessageButton, MessageComponent } from "discord-buttons";
import { Discord_Ticket_Parent_Id } from "../../../Config";
import { ButtonIds } from "../../../Interfaces/Discord/ButtonsIds";
import Logger from "../../../Lib/Logger";
import Button from "../../Struct/Button";

export default class TicketButton extends Button
{
    public id = "create_ticket";
    public run(button: MessageComponent)
    {
        // Get user who clicked
        const user = button.clicker;
        const parent = Discord_Ticket_Parent_Id;

        button.guild.channels.create(`${user.user.username}-ticket`, {
            type: "text",
            parent: parent,
        }).then(channel => {
            channel.overwritePermissions([
                {
                  id: button.guild.roles.everyone.id,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: user.id,
                  allow: ["VIEW_CHANNEL"],
                },
            ]);

            let closeButton = new MessageButton()
                            .setID("delete_channel")
                            .setLabel("Close ticket")
                            .setStyle("red")
                            .setEmoji("❌");

            channel.send(`<@${user.id}>`, {
                button: closeButton,
            });
        })

        // Create a channel etc etc.
        button.reply.send(`Ticket created! #${user.user.username.toLowerCase()}-ticket`, { ephemeral: true });
    }
}