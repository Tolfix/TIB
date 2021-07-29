import { Document } from "mongoose";
import { Repository } from "./Github/Repository";

export interface IUserSchema extends Document, IUser {}

export interface IUser
{
    email: string;
    github_id: string;
    github_email: string;
    discord_id: string;
    discord_email: string;
    contributedTo: Repository[] | undefined;
}