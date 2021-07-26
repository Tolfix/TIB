import { Discord_Token } from "../src/Config";

describe("Checking envs", () => {
    it("should be empty", () => {
        expect(Discord_Token).toEqual(process.env.DISCORD_TOKEN ?? "")
    });
})