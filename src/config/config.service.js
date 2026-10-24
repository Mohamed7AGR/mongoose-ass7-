import dotenv from 'dotenv';
import { resolve } from 'path';
let envFile = resolve(`.env.${process.env.NODE_ENV || 'development'}`)
dotenv.config({
    path: envFile,
});
export default {
    PORT: Number(process.env.PORT),
    DB_URI: process.env.DB_URI,
}