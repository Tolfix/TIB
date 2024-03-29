import { MessageActionRow, MessageButton } from "discord-buttons";
import { DataButton } from "../../Interfaces/Discord/CreateButton";

export default function CreateButton(...data: DataButton[]): MessageActionRow
{
    let buttons = [];
    let rows = new MessageActionRow();

    for(let button of data)
    {
        let b = new MessageButton()
                .setLabel(button.name)

        if(button.id && !button.url)
            b.setID(button.id)

        if(button.style && !button.url)
            b.setStyle(button.style)

        if(button.disabled)
            b.setDisabled(true);

        if(button.emoji)
            b.setEmoji(button.emoji);

        if(button.url)
        {
            b.setURL(button.url)
            b.setStyle("url")
        }

        buttons.push(b);
    }
    
    for(let row of buttons)
    {
        rows.addComponent(row)
    }

    return rows;
}