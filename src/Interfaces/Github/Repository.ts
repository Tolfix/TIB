import { Contributor } from "./Contributors";

export interface Repository
{
    contributors: Contributor[];
    name: string;
    owner: string;
}