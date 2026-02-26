import { z } from 'zod';

export const signupSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    emailId: z.email("Enter a valid email address"),
    mobileNo: z
        .string()
        .min(8, "Enter a valid mobile number")
        .regex(/^[0-9]+$/, "Mobile number must contain only digits"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms",
    }),
    isIndividual: z.boolean().optional(),
});