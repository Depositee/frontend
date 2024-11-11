import { config } from "dotenv";
config();

console.log(process.env, "process.env");
export const GATE_WAY_URL =
  process.env.NEXT_PUBLIC_GATE_WAY_URL ?? "localhost/api";
// export const GATE_WAY_PORT = process.env.NEXT_PUBLIC_GATE_WAY_PORT ?? 3000;
export const RABBIT_MQ_URL =
  process.env.NEXT_PUBLIC_RABBIT_MQ_URL ?? "localhost";
