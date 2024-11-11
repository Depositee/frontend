import { config } from "dotenv";
config();

export const GATE_WAY_URL =
  process.env.NEXT_PUBLIC_GATE_WAY_URL ?? "localhost/apis";
