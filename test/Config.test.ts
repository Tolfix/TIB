import { Discord_Token, Prefix } from "../src/Config";

describe("Checking envs", () => {
    it("should be equal | discord_token", () => {
        expect(Discord_Token).toEqual(process.env.DISCORD_TOKEN ?? "")
    });

    it("should be equal | Prefix", () => {
        expect(Prefix).toEqual(process.env.PREFIX ?? "tib ")
    });
})