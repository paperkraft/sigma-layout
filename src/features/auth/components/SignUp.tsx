"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FloatingInputController } from '@/components/form-controls/floating/InputController';
import LoaderEffect from '@/components/shared/loader-effect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { user_api } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { useApi } from '@/hooks/use-api';
import { signupSchema } from '@/schema/auth/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckboxController } from '@/components/form-controls/floating/CheckboxController';
import { Checkbox } from '@/components/ui/checkbox';

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { post } = useApi();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      terms: false,
      isIndividual: true,
      firstName: "",
      lastName: "",
      organisationName: "",
      emailId: "",
      mobileNo: "",
      password: ""
    }
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const isIndividual = form.watch("isIndividual");

  const onSubmit = useCallback(async (data: SignupFormValues) => {

    const { firstName, lastName, organisationName, isIndividual, terms, ...rest } = data;

    let payload: any = {
      ...rest,
      isIndividual,
      "countryName": "India",
      "countryCode": "+91",
      "invitedProjectId": null,
    };

    if (isIndividual) {
      payload.firstName = firstName;
      payload.lastName = lastName;
    } else {
      payload.organisationName = organisationName;
    }

    localStorage.setItem('emailId', rest.emailId);

    const { data: result, error } = await post(`${user_api}/Signup`, payload);

    if (error) {
      toast.error(error);
      return;
    }

    if (result && !result.isSuccess) {
      toast.error(result.resMsg);
      return;
    }

    if (result && result.isSuccess) {
      router.replace("/auth/email-sent");
    }
  }, [post, router]);

  return (
    <AuthLayout
      heroTitle="Join the world's largest simulation community."
      heroSubtitle="Start simulating in minutes. No installation required. Access powerful cloud computing resources directly from your browser."
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
      showBackToLogin
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Create your account
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Start your 30-days free trial. No credit card required.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Account Type Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-md">
            <button
              type="button"
              onClick={() => setValue('isIndividual', true, { shouldValidate: true })}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isIndividual ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Individual
            </button>
            <button
              type="button"
              onClick={() => setValue('isIndividual', false, { shouldValidate: true })}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${!isIndividual ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Organization
            </button>
          </div>

          {isIndividual ? (
            /* First + Last Name */
            <div className="grid grid-cols-2 gap-4">
              <FloatingInputController
                name='firstName'
                label='First Name'
                placeholder='Enter First Name'
                forcelightmode
                reset
              />

              <FloatingInputController
                name='lastName'
                label='Last Name'
                placeholder='Enter Last Name'
                forcelightmode
                reset
              />
            </div>
          ) : (
            /* Organization Name */
            <FloatingInputController
              name='organisationName'
              label='Organization Name'
              placeholder='Enter Organization Name'
              forcelightmode
              reset
            />
          )}

          {/* Email + Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <FloatingInputController
              type='email'
              name='emailId'
              label='Email'
              placeholder='Enter email'
              forcelightmode
              reset
            />

            <FloatingInputController
              type='number'
              name='mobileNo'
              label='Mobile No.'
              placeholder='Enter Mobile No.'
              maxLength={10}
              forcelightmode
              reset
            />
          </div>

          {/* Password */}
          <FloatingInputController
            type='password'
            name='password'
            label='Password'
            placeholder='Create a password'
            forcelightmode
          />

          {/* Terms */}
          <div>
            <div className="flex items-start py-2">
              <CheckboxController
                disableRHF
                {...form.register('terms')}
                onCheckedChange={(c) => { setValue('terms', c); form.clearErrors('terms') }}
                className='dark:[&_button]:bg-white dark:[&_button]:border-gray-400 dark:[&_button]:text-white dark:[&_button]:data-[state=checked]:border-primary'
              />
              <label htmlFor='terms' className="text-xs text-slate-500 leading-relaxed">
                I agree to the&nbsp;<Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                &nbsp;and&nbsp;<Link href="#" className="text-primary hover:underline">&nbsp;Privacy Policy</Link>
              </label>
            </div>
            {errors.terms && (<p className="text-xs text-destructive">{errors.terms.message}</p>)}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className='w-full h-10 dark:text-white shadow-md rounded-sm'
          >
            <LoaderEffect loading={isSubmitting} loadingText="Creating Account..." text="Get Started" />
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Already have an account?
        <Link href="/auth/sign-in" className="ml-2 font-semibold text-primary">Sign in</Link>
      </div>
    </AuthLayout>
  );
}