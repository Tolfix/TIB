import { Document } from "mongoose";
import { ISponsor } from "../Github/Sponsor";

export interface ISponsorSchema extends Document, ISponsor {}