"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';

const AuthForm = ({type}: {type:string}) => {

   //get the user state
  const [user, setUser] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  //get the router
  const router = useRouter();

  const formSchema = authFormSchema(type)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    //set the loading animation to true
    setIsLoading(true);

    try{
        //register with AppWrite and create Plaid token

        if(type === 'sign-up'){
            const user = await signUp(data);

            setUser(user);
        }
        else if(type === 'sign-in'){

            const response = await signIn({
                email: data.email,
                password: data.password
            });

            if(response){
                //reroute back to home page
                router.push("/");
            }
        }
    }catch(e){
        console.error(e)
    }
    finally{
        setIsLoading(false)
    }
  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-6 md:gap-6'>
            <Link href='/' className='cursor-pointer flex items-denter gap-1'>
                <Image src='/icons/logo.svg' width={34} height={34} alt='Finexa Logo'/>
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Finexa</h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user? 'LinkAccount': type === 'sign-in'? 'Sign-In':'Sign-up'}
                </h1>
                <p className='text-16 font-normal text-gray-600'>
                    {user ? 'Link your account to get started':'Please enter your details to get started'}
                </p>
            </div>
        </header>
        {user ? (
            <div className='flex- flex-col gap-4'>
                /** This will be the Plaid form */
            </div>
        ) : (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        {type === 'sign-up' && (
                            <>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your First Name'/>
                                    <CustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your Last Name'/>
                                </div>
                                <CustomInput control={form.control} name='address1' label='Address' placeholder='Enter your specific Address'/>
                                <CustomInput control={form.control} name='city' label='City' placeholder='Enter your City'/>

                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='state' label='State' placeholder='Ex: VA'/>
                                    <CustomInput control={form.control} name='postalCode' label='Postal Code' placeholder='Ex: 12345'/>
                                </div>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='dob' label='Date oF Birth' placeholder='YYYY-MM-DD'/>
                                    <CustomInput control={form.control} name='ssn' label='SSN' placeholder='Ex: 123-45-6789'/>
                                </div>
                            </>
                        )}
                        <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email ID'/>
                        <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password'/>
                        
                        <div className='flex flex-col gap-4'>
                            <Button type="submit" className='form-btn' disabled={isloading}>
                            {isloading ? (
                                <>
                                <Loader2 size={20} className='animate-spin'>$nbsp; Loading .....</Loader2>
                                </>
                            ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}</Button>
                        </div>
                    </form>
                </Form>
                <footer className='flex justify-center gap-1'>
                    <p className='text-14 text-normal text-gray-600'>
                        {type === 'sign-in' ? "Dont't have an account?" : "Already have an account?"}
                    </p>
                    <Link href={type === 'sign-in'? '/sign-up' : '/sign-in'} className='form-link'>
                        {type === 'sign-in'? 'Sign Up' : 'Sign In'}
                    </Link>
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm
