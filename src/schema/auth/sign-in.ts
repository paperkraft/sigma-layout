import { z } from 'zod';

export const signInSchema = z.object({
    emailId: z.email("Enter a valid email address"),
    password: z.string().min(1, "Enter a valid password"),
});