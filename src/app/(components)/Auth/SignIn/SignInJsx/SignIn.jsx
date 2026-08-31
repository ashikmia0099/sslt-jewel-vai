'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { postfetchLogin } from '@/redux/features/Auth/loginSlice';

function SignIn() {

    const dispatch = useDispatch();
    const { loginData, loading } = useSelector(state => state.login);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);


    const handleSignIn = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const email = form.get('email')?.trim();
        const password = form.get('password');

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        const data = { email, password };


        try {
            const resultAction = await dispatch(postfetchLogin(data));

            if (postfetchLogin.fulfilled.match(resultAction)) {

                const user = resultAction.payload.data.user;
                if (!user.isVerified) {
                    toast.error("Please verify your email first");
                    return;
                }
                if (user.role !== "ADMIN") {
                    toast.error("Only admin can login");
                    return;
                }

                toast.success("Login successful");
                router.push("/Deshboard/DeshboardLoginUser/DeshboardLoginUserAllList");

            } else {
                throw new Error(resultAction.payload);
            }

        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className='flex-row items-center pt-20 md:pt-0 lg:pt-10'>
            <ToastContainer position="top-center" />
            <div className='text-center'>
                <h1 className='text-3xl lg:text-4xl xl:text-5xl text-black font-semibold goudy-bookletter-1911-regular'>Please Login</h1>
                <p className=' text-lg lg:text-xl py-4'>
                    <span className='text-[#92C0E9]'>Create Account?</span>
                    <span className='mx-6 border-b border-[#2572e7] font-semibold'>
                        <Link href="/Auth/Signup" className="text-black">Sign Up</Link>
                    </span>
                </p>
            </div>

            <div className=' px-5 xl:w-[60%] mx-auto'>
                <form onSubmit={handleSignIn}>
                    <div className='mt-2'>
                        <legend className="fieldset-legend text-black goudy-bookletter-1911-regular text-lg xl:text-xl">Email</legend>
                        <input
                            type="email"
                            name='email'
                            required
                            placeholder="Enter your email"
                            className="h-10 bg-black text-white w-full text-sm px-5 font-semibold rounded-lg" />
                    </div>
                    <div className='mt-2'>
                        <legend className="fieldset-legend text-black goudy-bookletter-1911-regular text-lg xl:text-xl">Password</legend>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                required
                                placeholder="Enter password"
                                className="h-10 bg-black text-white w-full text-sm px-5 font-semibold rounded-lg" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-2 text-2xl" >
                                {showPassword ? <FaRegEye className='text-white' /> : <FaEyeSlash className='text-white' />}
                            </button>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <button
                            type="submit"
                            className='btn w-full rounded-full bg-[#92C0E9] text-lg lg:text-xl text-black border-none goudy-bookletter-1911-regular'
                            disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <h3 className='text-center py-10'>
                    <span className=' text-[16px] md:text-xl font-bold goudy-bookletter-1911-regular'>Note : </span>
                    <span className=' text-sm md:text-lg font-medium'>
                        Only admin user type can login.
                    </span>
                </h3>
            </div>
        </div>
    );
}

export default SignIn;
