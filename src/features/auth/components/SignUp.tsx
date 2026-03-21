"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { CheckboxController } from '@/components/form-controls/floating/checkbox-controller';
import { FloatingInputController } from '@/components/form-controls/floating/input-controller';
import LoaderEffect from '@/components/shared/loader-effect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { auth_api } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { useApi } from '@/hooks/use-api';
import { signupDefaultValues, signupSchema } from '@/schema/auth/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from '@/hooks/use-debounce';
import { AuthHeader } from './AuthHeader';

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { post } = useApi();

  const [suggestion, setSuggestion] = useState<string[]>([]);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: signupDefaultValues
  });

  const isIndividual = form.watch("isIndividual");
  const debounce = useDebounce(form.watch('userName'), 300);

  useEffect(() => {
    if (!debounce || debounce.length < 3) {
      setSuggestion([]);
      form.clearErrors("userName");
      return
    }

    let isActive = true;

    const checkUserName = async () => {
      try {
        const { data, error } = await post(`${auth_api}/check-username?userName=${debounce}`);

        if (!isActive) return;

        if (error) {
          form.setError("userName", {
            message: "Unable to validate username. Try again.",
          });
          return;
        }

        if (!data?.isSuccess) {
          form.setError('userName', { message: "That username is already taken." });
          setSuggestion(data?.result?.availableNames || []);
        } else {
          form.clearErrors("userName");
          setSuggestion([]);
        }
      } catch (error) {
        if (!isActive) return;

        form.setError("userName", {
          message: "Something went wrong.",
        });
      }
    }

    checkUserName();

    return () => {
      isActive = false;
    };
  }, [debounce, form, post]);

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

    const { data: result, error } = await post(`${auth_api}/signup`, payload);

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
      <AuthHeader title='Create your account' description='Start your 30-days free trial. No credit card required.' />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Account Type Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-md">
            <button
              type="button"
              onClick={() => form.setValue('isIndividual', true, { shouldValidate: true })}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isIndividual ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Individual
            </button>
            <button
              type="button"
              onClick={() => form.setValue('isIndividual', false, { shouldValidate: true })}
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
              minLength={10}
              maxLength={10}
              forcelightmode
              reset
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FloatingInputController
                type='text'
                name='userName'
                label='Username'
                placeholder='Enter username'
                maxLength={20}
                forcelightmode
                reset
              />

              {suggestion.length > 0 && (
                <p className='text-sm text-slate-800'>
                  Available:&nbsp;
                  <span className='text-primary cursor-pointer hover:bg-primary/10 p-0.5 px-1 rounded'
                    onClick={() => {
                      form.setValue("userName", suggestion[0], { shouldValidate: true });
                      setSuggestion([]);
                    }}
                  >
                    {suggestion[0]}
                  </span>
                </p>
              )}
            </div>

            <FloatingInputController
              type='password'
              name='password'
              label='Password'
              placeholder='Create a password'
              maxLength={20}
              forcelightmode
            />
          </div>

          {/* Terms */}
          <div>
            <div className="flex items-start py-2">
              <CheckboxController
                disableRHF
                {...form.register('terms')}
                onCheckedChange={(c) => { form.setValue('terms', c); form.clearErrors('terms') }}
                className='dark:[&_button]:bg-white dark:[&_button]:border-gray-400 dark:[&_button]:text-white dark:[&_button]:data-[state=checked]:border-primary'
              />
              <label htmlFor='terms' className="text-xs text-slate-500 leading-relaxed">
                I agree to the&nbsp;<Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                &nbsp;and&nbsp;<Link href="#" className="text-primary hover:underline">&nbsp;Privacy Policy</Link>
              </label>
            </div>
            {form.formState.errors.terms && (<p className="text-xs text-destructive">{form.formState.errors.terms.message}</p>)}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className='w-full h-10 dark:text-white shadow-md rounded-sm'
          >
            <LoaderEffect loading={form.formState.isSubmitting} loadingText="Creating Account..." text="Get Started" />
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