import { MessageComponent } from "discord-buttons";
import CreateButton from "../../../Lib/Discord/CreateButton";
import Button from "../../Struct/Button";

export default class DeleteChannelButton extends Button
{
    public id = "are_you_sure";
    public run(button: MessageComponent)
    {
        button.reply.send(`Are you sure you want to close this ticket?`, {
            component: CreateButton(
                {
                    name: "Yes",
                    emoji: "✔",
                    style: "green",
                    id: "delete_channel",
                },
                {
                    name: "No",
                    emoji: "❌",
                    style: "red",
                    id: "delete_message"
                }
            ),
            ephemeral: true,
        });
    }
}