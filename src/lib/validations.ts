import { z } from "zod";

const referralCodeRegex = /^[a-zA-Z0-9]*$/;

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
    .regex(referralCodeRegex, "Referral code must be alphanumeric.")
    .optional()
    .nullable()
    .transform((val) => (val === "" || !val ? null : val)),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
