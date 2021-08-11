import { readdirSync } from "fs";
import { HomeDir } from "../../Config";
import Logger from "../../Lib/Logger";

/**
 * 
 * @description This function sorts and handles our commands so we don't need to manually add them
 * by our own
 */
export default function CommandHandler(client: any): void
{
    let commandDir = HomeDir+"/build/Discord/Commands";
    client.category = readdirSync(commandDir);
    readdirSync(commandDir).forEach((dir) => {
        const command = readdirSync(`${commandDir}/${dir}`).filter((f) => f.endsWith('.js'));
        for (let file of command) {
            const pull = new (require(`${commandDir}/${dir}/${file}`)).default;
            if (pull.name) {
                Logger.discord(`Adding command ${pull.name} to collection`);
                client.commands.set(pull.name, pull);
            }
            continue;
        }
    });
}