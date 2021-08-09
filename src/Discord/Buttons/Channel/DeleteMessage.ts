import { MessageComponent } from "discord-buttons";
import Button from "../../Struct/Button";

export default class DeleteChannelButton extends Button
{
    public id = "delete_message";
    public run(button: MessageComponent)
    {
        button.message.delete();
    }
}