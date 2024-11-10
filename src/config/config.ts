import { config } from "dotenv";
config({ path: `.env` });

export const GATE_WAY_URL = process.env.GATE_WAY_URL ?? "localhost";
export const GATE_WAY_PORT = process.env.GATE_WAY_PORT ?? 3000;
export const RABBIT_MQ_URL = process.env.RABBIT_MQ_URL ?? "localhost";
