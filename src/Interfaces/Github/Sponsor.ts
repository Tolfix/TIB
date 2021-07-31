import { SponsorshipBody } from "simple-webhook-github/lib/Interfaces/Body";

export interface ISponsor
{
    github_id: number;
    tier: SponsorshipBody["sponsorship"]["tier"];
}