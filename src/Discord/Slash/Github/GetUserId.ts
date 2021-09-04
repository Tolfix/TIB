import Slash from "../../Struct/Slash";
import { Guild, GuildMember, MessageEmbed } from "discord.js";
import { Client } from "discord.js";
import { ApplicationCommandInteractionDataOption, Interaction } from "slash-commands";
import SlashReply from "../../../Lib/Discord/SlashReply";
import Github_GetUser from "../../../Lib/Github/GetUser";

export default class GetUserIdGithub extends Slash
{
    public name = "github-get-user-id";
    public options = {
        "name": this.name,
        "description": "Adds a sponsor",
        "options": [
            {
                "type": 3,
                "name": "github",
                "description": "Github id or name",
                "required": true
            }
        ]
    }
    public async run(
        client: Client,
        interaction: Interaction,
        author: GuildMember,
        guild: Guild,
        args: ApplicationCommandInteractionDataOption[] | undefined,
        sr: SlashReply
    )
    {
        //@ts-ignore
        let github = (args?.filter(e => e.type === 3))[0].value as string;

        const User = await Github_GetUser(github);

        return await sr.reply(`\`${User.id}\``);
    }
}