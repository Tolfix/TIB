import { MessageButton, MessageComponent } from "discord-buttons";
import CacheClient from "../../../Cache/Cache";
import { ButtonIds } from "../../../Interfaces/Discord/ButtonsIds";
import { Quick_Link_Github_Button } from "../../../Lib/Discord/QuickButton";
import Logger from "../../../Lib/Logger";
import Button from "../../Struct/Button";

export default class DeleteChannelButton extends Button
{
    public id = "user_contributes";
    public run(button: MessageComponent)
    {
        const userCache = CacheClient.getFromDiscordId(button.clicker.id);
        if(!userCache)
            return button.reply.send(`Please ensure to link your account before checking.`, { ephemeral: true, component: Quick_Link_Github_Button })
    
        return button.reply.send(`Coming soon...`, { ephemeral: true });
    }
}