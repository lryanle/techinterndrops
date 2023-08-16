import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
let output = dotenv.config({ path: __dirname + "/../.env" });

class ProcessEnvError extends Error {}

function getEnvOrThrow(envName: string): string {
  const envVar = process.env[envName];
  if (envVar === undefined) {
    throw new ProcessEnvError(`Environment variable ${envName} doesn't exist`);
  }
  return envVar;
}

const publicSupabaseUrl = getEnvOrThrow("PUBLIC_SUPABASE_URL");
const publicSupabaseAnonKey = getEnvOrThrow("PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createClient(publicSupabaseUrl, publicSupabaseAnonKey);

// export const supabase = createClient(publicSupabaseUrl, publicSupabaseAnonKey, {
//   global: { fetch: fetch.bind(globalThis) },
// });
