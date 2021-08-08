import { Github_Org } from "../../Config";
import CreateButton from "./CreateButton";

export const Quick_Link_Github_Button = CreateButton(
    {
        name: "Link discord/github",
        emoji: `🔗`,
        url: "https://tib.tolfix.com/oauth2/link"
    }
);

export const Quick_Sponsor_Github_Button = CreateButton(
    {
        name: "Sponsor us!",
        emoji: "🎊",
        url: `https://github.com/sponsors/${Github_Org}`
    }
)