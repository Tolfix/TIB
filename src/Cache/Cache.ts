import UserModel from "../Database/Schemes/User";
import { IC_User } from "../Interfaces/Cache/Cache_User";
import { IUser } from "../Interfaces/Users";
import log from "../Lib/Logger";

export default class CacheClient
{
    
    public User = new Map<IC_User, IUser>();

    constructor()
    {
        // Cache everything
        log.info(`Caching..`)
        // Cache user in database
        this.CacheUser();
    }

    public CacheUser()
    {
        UserModel.find().then(users => {
            users.forEach(user => {
                this.User.set(user.github_id, {
                    discord_id: user.id,
                    discord_email: user.email,
                    email: user.email,
                    github_email: user.email,
                    github_id: user.github_id
                });
            });
        });
    }
}