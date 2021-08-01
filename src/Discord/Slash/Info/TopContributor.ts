import { MessageButton } from "discord-buttons";
import { Guild, GuildMember, MessageEmbed } from "discord.js";
import { TextChannel } from "discord.js";
import { Client } from "discord.js";
import { ApplicationCommandInteractionDataOption, Interaction } from "slash-commands";
import CacheClient from "../../../Cache/Cache";
import SlashReply from "../../../Lib/Discord/SlashReply";
import Logger from "../../../Lib/Logger";
import Slash from "../../Struct/Slash";

export default class TicketSetup extends Slash
{
    public name = "top-contributer";
    public options = {
        "name": this.name,
        "description": "Shows the top contributors on github",
    }
    public run(
        client: Client,
        interaction: Interaction,
        author: GuildMember,
        guild: Guild,
        args: ApplicationCommandInteractionDataOption[] | undefined,
        sr: SlashReply
    )
    {
        let users = new Map();
        for (const [key, value] of CacheClient.Respositories.entries()) {
            if(value.contributors.length > 0)
            {
                for(const contributor of value.contributors)
                {
                    let user = users.get(contributor.author.id) 
                    if(!user)
                    {
                        users.set(contributor.author.id, {
                            name: contributor.author.login,
                            total: contributor.total
                        });
                    }
                    
                    if(user)
                    {
                        user.total = user.total+contributor.total;

                        users.set(contributor.author.id, {
                            ...user
                        });
                    }
                }
            }
        }

        users[Symbol.iterator] = function* () {
            yield* [...this.entries()].sort((a, b) => a[1].total - b[1].total);
        }

        let tops = ``;
        let count = 1;
        
        for (let [key, value] of users)
        {
            tops += `**${count}** => ${value.name} : \`${value.total}\`\n`
        }
        
        const embed = new MessageEmbed()
        .setTitle("Top Contributors")
        .setDescription(tops)
        .setColor("")
        .setThumbnail("https://cdn.tolfix.com/images/TX-Small.png")

        sr.reply(embed);
    }
}