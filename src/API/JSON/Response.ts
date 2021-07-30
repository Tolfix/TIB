import { Response } from 'express';

export function API_Error(response: Object, status?: number)
{
    return (res: Response) =>
    {
        let result = {
            status: status ? status : 400,
            type: "error",
            message: response
        };
        return res.status(status ?? 400).json(result);
    }
}

export function API_Success(response: Object, status?: number)
{
    return (res: Response) =>
    {
        let result = {
            status: status ? status : 200,
            type: "success",
            message: response
        };
        return res.status(status ?? 200).json(result);
    }
}