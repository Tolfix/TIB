import { ReplyOptions } from "discord-buttons";
import { MessageAdditions } from "discord.js";
import { APIMessage, Client } from "discord.js"
import { Interaction } from "slash-commands"

export default class SlashReply
{
    private client: Client;
    private interaction: Interaction;
    constructor(client: Client, interaction: Interaction)
    {
        this.client = client;
        this.interaction = interaction;
    }

    private createAPIMessage = async (content: any) => {
        const { data, files } = await APIMessage.create(
            //@ts-ignore
            this.client?.channels?.resolve(this.interaction?.channel_id),
        content
        )
            .resolveData()
            .resolveFiles()
    
        return { ...data, files }
    }
    
    public reply = async (response: any, options?: MessageAdditions | (ReplyOptions & {
        split?: false | undefined;
    })) => {
        let data = {
            content: response,
            ...options
        }
    
        if (typeof response === 'object') {
            //@ts-ignore
            data = await this.createAPIMessage(response)
        }
    
        //@ts-ignore
        this.client.api.interactions(this.interaction.id, this.interaction.token).callback.post({
            data: {
                type: 4,
                data,
            },
        });
    }
};