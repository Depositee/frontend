import { config } from "dotenv";
config({ path: `.env` });

export const { GATE_WAY_URL } = process.env ?? "localhost";
export const { GATE_WAY_PORT } = process.env ?? 3000;
export const { RABBIT_MQ_URL } = process.env ?? "localhost";
