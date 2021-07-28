import { stripIndent } from "common-tags";
import fs from "fs";
import { HomeDir } from "./Config";
import { IENV } from "./Interfaces/ENV";

export default function Check()
{
    // Check if .env
    if(!CheckEnv())
        process.exit(1);

}

function CheckEnv(): Boolean
{
    const envFile = fs.existsSync(HomeDir+"/.env");
    if(envFile)
        return true;
    
    let env: Array<keyof IENV> = [
        "DB_MONGO_URI", 
        "DEBUG", 
        "DISCORD_CLIENT_ID",
        "DISCORD_CLIENT_SECRET",
        "DISCORD_TOKEN",
        "EXPRESS_PORT",
        "EXPRESS_SESSION_SECRET",
        "FQDN",
        "HTTP",
        "PREFIX",
        "GITHUB_CLIENT_ID",
        "GITHUB_CLIENT_SECRET"
    ]

    let data = ``;

    for(let e of env)
    {
        data += `${e}=\n`
    }

    fs.appendFileSync(HomeDir+"/.env", data);
    

    return true;
}