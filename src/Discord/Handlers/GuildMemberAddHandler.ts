import { Role } from "discord.js";
import { Client, GuildMember } from "discord.js";
import CacheClient from "../../Cache/Cache";
import { Discord_Contributor_Role_Id, Discord_Member_Role_Id } from "../../Config";
import Logger from "../../Lib/Logger";

export default async function GuildMemberAddHandler(client: Client, member: GuildMember)
{
    // Get default role
    let role = member.guild.roles.cache.find(e => e.id === Discord_Member_Role_Id) as Role;

    // Give the user the default role.
    member.roles.add(role);
    Logger.info(member.user.tag, `Joined the server`);

    // Check if contributor
    const CachedUserId = CacheClient.getFromDiscordId(member.user.id);
    if (!CachedUserId)
        return;

    const User = CacheClient.User.get(CachedUserId);

    if(!User)
        return;

    if(!User?.contributedTo)
        return;

    if(User.contributedTo.length <= 0)
        return;

    // Assuming they have contributed by now.
    let ContributorRole = member.guild.roles.cache.find(e => e.id === Discord_Contributor_Role_Id) as Role;
    member.roles.add(ContributorRole);
    Logger.info(member.user.tag, `Is a contributor adding role.`);
}