import { z } from 'zod';

export const signInSchema = z.object({
    emailId: z.string("Enter a valid email or username"),
    password: z.string().min(1, "Enter a valid password")
});