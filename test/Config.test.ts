import { Discord_Token, Prefix, Database_Mongo_URI, Express_Port } from "../src/Config";

describe("Checking envs", () => {
    it("should be equal | discord_token", () => {
        expect(Discord_Token).toEqual(process.env.DISCORD_TOKEN ?? "");
    });

    it("should be equal | Prefix", () => {
        expect(Prefix).toEqual(process.env.PREFIX ?? "tib ");
    });

    it("should be equal | Database_Mongo_URI", () => {
        expect(Database_Mongo_URI).toEqual(process.env.DB_MONGO_URI ?? "mongodb://localhost/tib");
    });

    it("should be equal | Express_Port", () => {
        expect(Express_Port).toEqual(process.env.EXPRESS_PORT ?? 8080);
    });
})