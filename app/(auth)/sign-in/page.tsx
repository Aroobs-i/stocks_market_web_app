"use client";

import FooterLinks from "@/components/forms/FooterLinks";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const { 
      register, 
      handleSubmit, 
      formState: {errors, isSubmitting},
  } = useForm<SignInFormData>({
    defaultValues:{
      email: '',
      password: '',
    },
    mode: 'onBlur'
  });

  const onSubmit = async(data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if(result.success)router.push('/');
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in", {
        description: error instanceof Error ? error.message : 'Failed to sign in to your account'
      })
    }
  }

  return (
    <>
      <h1 className="form-title">Log In Your Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="john@example.com"
          register={register}
          error={errors.email}
          validation={{ required: 'Email is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required'}}  
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: 'Password is required', minLength: 8}} 
       />

       <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Signing In' : 'Sign In'}
       </Button>

       <FooterLinks
         text="Don't have an account?"
         linkText="Sign up"
         href="/sign-up"  
       />
      </form>
    </>
  )
}

export default SignIn