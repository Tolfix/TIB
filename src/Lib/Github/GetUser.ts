import { Github_API, Github_Org } from "../../Config";
import Github_GetAuth from "./GetAuth";
import fetch from "node-fetch";

export default async function Github_GetUser(user: number | string)
{
    const User = await (await fetch(`${Github_API}${typeof user === "number" ? "user" : "users"}/${user}`, {
        headers: {
            authorization: Github_GetAuth()
        }
    })).json()

    return Promise.resolve(User);
}