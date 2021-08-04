import { stripIndent } from "common-tags";
import { MessageButton, MessageComponent } from "discord-buttons";
import { MessageEmbed } from "discord.js";
import CacheClient from "../../../Cache/Cache";
import { CDN_TX_Image, Color_Green, Color_Purple, Github_Org } from "../../../Config";
import { ButtonIds } from "../../../Interfaces/Discord/ButtonsIds";
import { Quick_Link_Github_Button, Quick_Sponsor_Github_Button } from "../../../Lib/Discord/QuickButton";
import Logger from "../../../Lib/Logger";
import Button from "../../Struct/Button";

export default class DeleteChannelButton extends Button
{
    public id = "user_sponsor";
    public run(button: MessageComponent)
    {
        const userCache = CacheClient.getFromDiscordId(button.clicker.id);
        if(!userCache)
            return button.reply.send(`Please ensure to link your account before checking.`, { ephemeral: true, component: Quick_Link_Github_Button })
    
        const user = CacheClient.User.get(userCache);
        if(!user)
            return;

        const sponsor = CacheClient.Sponsor.get(user.github_id);

        if(!sponsor)
            return button.reply.send(
                stripIndent`Looks like you are not a sponsor!
                *are you sure you are a sponsor contact the owner to resolve!*`
                , { ephemeral: true, component: Quick_Sponsor_Github_Button }
            )

        const embed = new MessageEmbed()
        .addField(sponsor.tier.name, stripIndent`
        Sponsored us at \`${sponsor.tier.created_at}\`
        Donated \`$${sponsor.tier.monthly_price_in_dollars}\`
        `)
        .setColor(Color_Purple)
        .setTimestamp()
        .setThumbnail(CDN_TX_Image)

        return button.reply.send(embed, { ephemeral: true });
    }
}