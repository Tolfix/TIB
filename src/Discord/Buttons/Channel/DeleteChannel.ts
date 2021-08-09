import { MessageComponent } from "discord-buttons";
import Button from "../../Struct/Button";

export default class DeleteChannelButton extends Button
{
    public id = "delete_channel";
    public run(button: MessageComponent)
    {
        button.channel.delete();
    }
}