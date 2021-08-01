import { Document } from "mongoose";
import { Contribution } from "../Github/Contribution";
import { Repository } from "../Github/Repository";

export interface IUserSchema extends Document, IUser {}

export interface IUser
{
    email: string;
    github_id: number;
    github_email: string;
    discord_id: string;
    // discord_email: string;
    contributedTo: Contribution[] | undefined;
}