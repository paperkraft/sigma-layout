"use client";

import Link from 'next/link';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FloatingInputController } from '@/components/form-controls/floating/input-controller';
import LoaderEffect from '@/components/shared/loader-effect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { auth_api } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { useApi } from '@/hooks/use-api';
import { signInSchema } from '@/schema/auth/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthHeader } from './AuthHeader';

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const { post } = useApi();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { emailId: "", password: "" }
  });

  const onSubmit = useCallback(async (data: SignInFormValues) => {
    const { data: result, error } = await post(`${auth_api}/login`, data);

    if (error) {
      toast.error(error);
      return;
    }

    if (result && !result.isSuccess) {
      toast.error(result.resMsg);
      return;
    }

    if (result && result.isSuccess) {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectPath = urlParams.get('redirect') || "/home";
      window.location.replace(redirectPath);
    }
  }, [post]);


  return (
    <AuthLayout
      heroTitle="Simulate your world, faster than ever."
      heroSubtitle="Join 500,000+ engineers designing the future with cloud-native simulation. No hardware required."
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
      topRightElement={<NewAccountButton />}
    >
      <AuthHeader title='Welcome back' description='Enter your credentials to access your workbench.' />

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white">

          <FloatingInputController
            type='text'
            name='emailId'
            label='Email/Username'
            placeholder='Enter email or username'
            forcelightmode
            reset
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium text-primary hover:underline"
                prefetch={false}
              >
                Forgot password?
              </Link>
            </div>

            <FloatingInputController
              type='password'
              name='password'
              label='Password'
              placeholder='Enter password'
              forcelightmode
            />
          </div>

          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className='w-full h-10 dark:text-white shadow-md rounded-sm'
          >
            <LoaderEffect loading={form.formState.isSubmitting} text='Sign In' loadingText='Signing in...' />
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <p className="text-xs text-center text-slate-400 mt-8 leading-relaxed px-4">
        By clicking sign in, you agree to our&nbsp;
        <Link href="#" className="underline hover:text-primary">Terms of Service</Link>&nbsp; and&nbsp;
        <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </AuthLayout>
  );
}

const NewAccountButton = () => (
  <div className="text-xs sm:text-sm">
    <span className="text-slate-500">New here?</span>
    <Link
      href="/auth/sign-up"
      className="ml-2 font-semibold text-primary hover:text-primary hover:underline"
      prefetch={false}
    >
      Create an account
    </Link>
  </div>
)