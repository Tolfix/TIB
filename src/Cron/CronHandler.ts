import { readdirSync } from "fs";
import { HomeDir } from "../Config";

export default function CronHandler()
{
    let commandDir = HomeDir+"/build/Cron";
    const command = readdirSync(`${commandDir}`).filter((f) => f.endsWith('.js'));
    for (let file of command) {
        if(file !== "CronHandler.js")
        {
            const pull = require(`${commandDir}/${file}`).default;
            if (pull) {
                pull();
            }
        }
        continue;
    }
}