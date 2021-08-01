import { MessageButton, MessageComponent } from "discord-buttons";
import { MessageEmbed } from "discord.js";
import CacheClient from "../../../Cache/Cache";
import { Color_Green, Github_Org } from "../../../Config";
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
    
        const user = CacheClient.User.get(userCache);
        if(!user)
            return;

        if(!user.contributedTo)
            return button.reply.send(`You haven't contributed to any repositories from \`${Github_Org}\`!`, { ephemeral: true });

        let data = ``;
        for(const contri of user.contributedTo)
        {
            data += `**${contri.owner}/${contri.name}** : ${contri.contributed.total}\n`
        }

        const embed = new MessageEmbed()
        .setTitle(`Total contributes on each repository`)
        .setDescription(data)
        .setColor(Color_Green);

        return button.reply.send(embed, { ephemeral: true });
    }
}