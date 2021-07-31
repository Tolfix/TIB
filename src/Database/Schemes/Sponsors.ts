import { model, Schema } from "mongoose"
import { ISponsorSchema } from "../../Interfaces/Database/Sponsor";

const SponsorSchema = new Schema
(
    {

        github_id: {
            type: Number,
            required: true
        },

        tier: {
            type: Object,
            required: true
        }

    }
);

const SponsorModel = model<ISponsorSchema>("sponsors", SponsorSchema);

export default SponsorModel;