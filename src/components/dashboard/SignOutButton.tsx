"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSignOut() {
        setLoading(true);
        const supabase = createClient();
        await supabase.auth.signOut();
        router.refresh();
        router.push("/login"); // Explicit redirect
    }

    return (
        <button
            onClick={handleSignOut}
            disabled={loading}
            className="mt-2 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-colors disabled:opacity-50"
        >
            <LogOut className="w-4 h-4" />
            {loading ? "Signing out..." : "Sign out"}
        </button>
    );
}
