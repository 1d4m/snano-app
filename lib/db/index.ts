// src/db/index.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/lib/db/schema";

const sql = neon(process.env.DATABASE_URL!);

// drizzle に schema を渡すと型が効く！
export const db = drizzle(sql, { schema });
