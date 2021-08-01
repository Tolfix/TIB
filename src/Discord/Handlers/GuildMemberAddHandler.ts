import { Role } from "discord.js";
import { Client, GuildMember } from "discord.js";
import { Discord_Member_Role_Id } from "../../Config";
import Logger from "../../Lib/Logger";

export default async function GuildMemberAddHandler(client: Client, member: GuildMember)
{
    // Get default role
    let role = member.guild.roles.cache.find(e =>  e.id === Discord_Member_Role_Id) as Role;

    // Give the user the default role.
    member.roles.add(role);
    Logger.info(member.user.tag, `Joined the server`);
}