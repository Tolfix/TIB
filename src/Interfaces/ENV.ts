export interface IENV
{
    DISCORD_TOKEN: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    PREFIX: string;
    
    EXPRESS_PORT: string;
    FQDN: string;
    HTTP: string;
    EXPRESS_SESSION_SECRET: string;
    DB_MONGO_URI: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_SECRETS_SPONSOR: string;

    DEBUG?: string;
}