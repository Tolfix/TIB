import { Contributor } from "./Contributors";

export interface Contribution
{
    name: string;
    owner: string;
    contributed: Contributor;
}