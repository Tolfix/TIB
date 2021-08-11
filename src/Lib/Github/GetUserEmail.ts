import { Github_API, Github_Org } from "../../Config";
import Github_GetAuth from "./GetAuth";
import fetch from "node-fetch";

export default async function Github_GetUserEmail(userId: number)
{
    const User = await (await fetch(`${Github_API}user/${userId}`, {
        headers: {
            authorization: Github_GetAuth()
        }
    })).json()

    return User.email;
}