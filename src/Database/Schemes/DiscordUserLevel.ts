import { model, Schema } from "mongoose"
import { IDiscordUserLevel } from "../../Interfaces/Database/DiscordUserLevel";

const DiscordUserLevelSchema = new Schema
(
    {

        discord_id: {
            type: String,
        },

        level: {
            type: String,
        },

        xp: {
            type: Number
        }

    }
);

const DiscordUserLevel = model<IDiscordUserLevel>("discord_level", DiscordUserLevelSchema);

export default DiscordUserLevel;