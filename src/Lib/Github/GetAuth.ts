import { Github_Client_Id, Github_Client_Secret } from "../../Config";

export default function Github_GetAuth()
{
    return `Basic ${Buffer.from(`${Github_Client_Id}:${Github_Client_Secret}`).toString("base64")}`
}