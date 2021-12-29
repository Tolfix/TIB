import { Client } from "discord.js";
import { CronJob } from "cron";
import Logger from "../../Lib/Logger";
import { Discord_Contributor_Role_Id, Discord_Member_Role_Id } from "../../Config";
import { Role } from "discord.js";
import CacheClient from "../../Cache/Cache";

export default function CheckerHandler(client: Client)
{
    // check every 30 minutes cron
    new CronJob("0 */30 * * * *", () => {

        // Check if someone is missing roles.
        client.guilds.cache.forEach(async (guild) => {
            guild.members.cache.forEach(async (member) => {
                if(member.user.bot) return;
                // Check if member has the role.
                if(!member.roles.cache.has(Discord_Member_Role_Id))
                {
                    let role = guild.roles.cache.find(e => e.id === Discord_Member_Role_Id) as Role;
                    member.roles.add(role);
                    Logger.info(member.user.tag, `Joined the server`);
                }
                // Check if they have contributed, and has the role
                const CachedUserId = CacheClient.getFromDiscordId(member.user.id);
                if(CachedUserId)
                {
                    const User = CacheClient.User.get(CachedUserId);
                    if(!User) return;
                    if(!User?.contributedTo) return;
                    if(User.contributedTo.length <= 0) return;
                    // Assuming they have contributed by now.
                    let ContributorRole = guild.roles.cache.find(e => e.id === Discord_Contributor_Role_Id) as Role;
                    member.roles.add(ContributorRole);
                    Logger.info(member.user.tag, `Is a contributor adding role.`);
                }

            });
        });

    }, null, true, "Europe/Stockholm");
}