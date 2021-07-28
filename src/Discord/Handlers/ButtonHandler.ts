import { Client } from "discord.js";
import { readdirSync } from "fs";
import { HomeDir } from "../../Config";

export default function ButtonHandler(client: Client)
{
    let commandDir = HomeDir+"/build/Discord/Buttons";
    client.category = readdirSync(commandDir);
    readdirSync(commandDir).forEach((dir) => {
        const command = readdirSync(`${commandDir}/${dir}`).filter((f) => f.endsWith('.js'));
        for (let file of command) {
            const pull = new (require(`${commandDir}/${dir}/${file}`)).default;
            if (pull.id) {
                client.buttons.set(pull.id, pull);
            }
            continue;
        }
    });
}
