import { model, Schema } from "mongoose"
import { IUserSchema } from "../../Interfaces/Database/Users";

const UserSchema = new Schema
(
    {

        email: {
            type: String,
            required: true
        },
        github_id: {
            type: Number,
            required: true
        },
        github_email: {
            type: String,
            required: true
        },
        discord_id: {
            type: String,
            required: true
        },
        // discord_email: {
        //     type: String,
        //     required: true
        // },

    }
);

const UserModel = model<IUserSchema>("users", UserSchema);

export default UserModel;