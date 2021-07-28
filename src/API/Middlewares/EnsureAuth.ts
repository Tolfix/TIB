import { NextFunction, Response, Request } from "express";
import OAuth2 from "../Struct/Oauth2";

export default function EnsureAuth(oauth: OAuth2)
{
    return (req: Request, res: Response, next: NextFunction) => {
        
    }
}