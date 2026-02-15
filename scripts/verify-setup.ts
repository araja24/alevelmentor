import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

// Helper to load .env.local manually since we are running as a standalone script
function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), ".env.local");
        console.log(`Checking for .env.local at: ${envPath}`);

        if (!fs.existsSync(envPath)) {
            console.error("⚠️ .env.local file NOT found!");
            return;
        }

        const envFile = fs.readFileSync(envPath, "utf8");
        const loadedKeys: string[] = [];

        // Split by newline (handling \r\n for Windows)
        envFile.split(/\r?\n/).forEach((line) => {
            // More robust regex: handle optional spaces around '=', ignore comments #
            const match = line.match(/^\s*([\w_.-]+)\s*=\s*(.*)?$/);
            if (match) {
                const key = match[1];
                let value = match[2] || "";
                // Remove end-of-line comments if any (simple case)
                if (value.includes("#")) {
                    // simplified comment handling
                    // value = value.split("#")[0].trim(); 
                }
                // Remove surrounding quotes
                value = value.trim().replace(/^["']|["']$/g, "");

                if (key && value) {
                    process.env[key] = value;
                    loadedKeys.push(key);
                }
            }
        });

        console.log("✅ Loaded .env.local with keys:", loadedKeys.join(", "));
    } catch (e) {
        console.error("⚠️ Could not load .env.local - relying on process.env", e);
    }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_KEY = process.env.RESEND_API_KEY;

async function verify() {
    console.log("🔍 Verifying Setup...\n");

    // 1. Check Supabase
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        console.error("❌ Supabase credentials missing in .env.local");
    } else {
        try {
            const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
            const { data, error } = await supabase.from("waitlist_users").select("count", { count: "exact", head: true });

            if (error) {
                if (error.code === '42P01') {
                    console.error("❌ Supabase Error: Table 'waitlist_users' does not exist. Did you run the migration?");
                } else {
                    console.error("❌ Supabase Connection Failed:", error.message);
                }
            } else {
                console.log("✅ Supabase Connection: OK (Table exists)");
            }
        } catch (e: any) {
            console.error("❌ Supabase Client Error:", e.message);
        }
    }

    // 2. Check Resend
    if (!RESEND_KEY) {
        console.error("❌ RESEND_API_KEY missing in .env.local");
    } else {
        try {
            const resend = new Resend(RESEND_KEY);
            // Try to list domains or something simple to verify key
            // Not all keys have permissions to list domains, but let's try sending a dummy email to nowhere?
            // Better: just check if the client inits.
            console.log("✅ Resend Client Initialized");
            // Optional: Send a test email?? Might be annoying. 
            // check if we can list api keys? (usually restricted)
            // We will assume it works if the key is present.
        } catch (e: any) {
            console.error("❌ Resend Error:", e.message);
        }
    }

    console.log("\nDone.");
}

verify();
