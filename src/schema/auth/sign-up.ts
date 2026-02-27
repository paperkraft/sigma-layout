import { z } from 'zod';

export const signupSchema = z.object({
    isIndividual: z.boolean(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    organisationName: z.string().optional(),
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
    })
}).superRefine((data, ctx) => {
    if (data.isIndividual) {
        if (!data.firstName || data.firstName.length < 2) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['firstName'],
                message: "First name must be at least 2 characters"
            });
        }
        if (!data.lastName || data.lastName.length < 2) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['lastName'],
                message: "Last name must be at least 2 characters"
            });
        }
    } else {
        if (!data.organisationName || data.organisationName.length < 2) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['organisationName'],
                message: "Organization name must be at least 2 characters"
            });
        }
    }
});