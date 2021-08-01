import mongoose from "mongoose";
import { Database_Mongo_URI, DebugMode } from "../Config";
import Logger from "../Lib/Logger";

export default class Mongo_Database
{
    private db;

    constructor()
    {
        mongoose.connect(Database_Mongo_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        
        this.db = mongoose.connection;

        this.db.on('error', (error: any) => {
            Logger.error(`A error accured for the database`, error);
        });
    
        this.db.on('disconnected', () => {
            Logger.error(`Lost connection to the database, shutting down.`)
            if(!DebugMode)
                process.exit(1);
        })
    
        this.db.once('open', () => {
            Logger.verbos(`Database opened`)
        });
    }
}