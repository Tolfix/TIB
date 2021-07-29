import { Client, Guild, TextChannel } from "discord.js";
import { Discord_Guild_Id, Discord_Client_Id, Discord_Public_Key, Discord_Token, HomeDir } from "../../Config";
import { ApplicationCommandOptionValue, DiscordInteractions, Interaction } from "slash-commands";
import { GuildMember } from "discord.js";
import log from "../../Lib/Logger";
import AW from "../../Lib/AW";
import { readdirSync } from "fs";
import SlashReply from "../../Lib/Discord/SlashReply";

declare module "slash-commands"
{
    //@ts-ignore
    type ApplicationCommandInteractionDataOption = ValueData & NestedData
    export type ValueData = {
        name: string;
        value: ApplicationCommandOptionValue;
    };
    export type NestedData = {
        name: string;
        options: ApplicationCommandInteractionDataOption[];
    };
}

export default async function SlashHandler(client: Client)
{
    const interaction = new DiscordInteractions({
        applicationId: Discord_Client_Id,
        authToken: Discord_Token,
        publicKey: Discord_Public_Key,
    });

    let commandDir = HomeDir+"/build/Discord/Slash";
    client.category = readdirSync(commandDir);
    readdirSync(commandDir).forEach(async (dir) => {
        const command = readdirSync(`${commandDir}/${dir}`).filter((f) => f.endsWith('.js'));
        for (let file of command) {
            const pull = new (require(`${commandDir}/${dir}/${file}`)).default;
            if (pull.name) {
                client.slash.set(pull.name, pull);

                const [Data, C_Error] = await AW(interaction.createApplicationCommand(pull.options, Discord_Guild_Id))
                if(C_Error)
                    log.error(`${C_Error}`)
            }
            continue;
        }
    });

    //@ts-ignore
    client.ws.on('INTERACTION_CREATE', async (interaction: Interaction) => 
    {
        //@ts-ignore
        if(interaction.data?.component_type)
            return;

        const command = interaction.data?.name;
        const args = interaction.data?.options;
        if(command)
        {
            let handler = (client.slash.get(command))?.run;
            //@ts-ignore
            const guild = client.guilds.cache.find(e => e.id === interaction.guild_id) as Guild;
            //@ts-ignore
            // const channel = guild?.channels.cache.get(interaction.channel_id) as TextChannel
            const author = await guild?.members.fetch(interaction.member.user.id) as GuildMember;

            // If we found and command execute it.
            if (command) {
                handler?.(
                    client,
                    interaction,
                    author,
                    guild,
                    //@ts-ignore
                    args,
                    new SlashReply(client, interaction)
                );
            };
        }
    });
}