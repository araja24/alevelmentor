import { z } from "zod";

export const waitlistSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address.")
        .min(5, "Email is too short.")
        .max(255, "Email is too long.")
        .transform((val) => val.toLowerCase().trim()),
    referralCode: z
        .string()
        .max(50, "Referral code is too long.")
        .optional()
        .nullable()
        .transform((val) => (val === "" ? null : val)),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
