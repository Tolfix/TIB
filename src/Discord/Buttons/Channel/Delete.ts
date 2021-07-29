import { MessageButton, MessageComponent } from "discord-buttons";
import { Discord_Ticker_Parent_Id } from "../../../Config";
import { ButtonIds } from "../../../Interfaces/Discord/ButtonsIds";
import log from "../../../Lib/Logger";
import Button from "../../Struct/Button";

export default class DeleteChannelButton extends Button
{
    public id = "delete_channel";
    public run(button: MessageComponent)
    {
        button.channel.delete(`Closing ticket`);
    }
}