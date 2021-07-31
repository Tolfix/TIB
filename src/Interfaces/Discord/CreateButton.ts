import { MessageButtonStyle } from "discord-buttons";
import { ButtonIds } from "./ButtonsIds";

export interface DataButton
{
    name: string;
    id?: keyof ButtonIds;
    style?: MessageButtonStyle;
    disabled?: Boolean;
    emoji?: string;
    url?: string;
}