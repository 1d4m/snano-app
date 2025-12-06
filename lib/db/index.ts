// src/db/index.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);

// drizzle に schema を渡すと型が効く！
export const db = drizzle(sql, { schema });
