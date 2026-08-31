'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { postfetchRegister } from '@/redux/features/Auth/registerSlice';
import Swal from 'sweetalert2';

function SignUp() {

    const dispatch = useDispatch();
    const { registerData } = useSelector(state => state.register);


    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setshowconfirmPassword] = useState(false);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    const handleSignUp = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');


        setPasswordError(false);
        setConfirmError(false);

        if (!passwordRegex.test(password)) {
            setPasswordError(true);
            toast.error("Password must be 8+ chars with at least one uppercase & one number.");
            return;
        }

        if (password !== confirmPassword) {
            setConfirmError(true);
            toast.error("Passwords do not match.");
            return;
        }

        const data = {
            name,
            email,
            password
        }

        try {
            const resultAction = await dispatch(postfetchRegister(data));

            if (postfetchRegister.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Check your email to verify", "success");
            } else {
                throw new Error(resultAction.payload);
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    }

    return (
        <div className='flex-row items-center pt-20 md:pt-0 lg:pt-2'>
            <ToastContainer />
            <div className='text-center'>
                <h1 className='text-3xl lg:text-4xl xl:text-5xl text-black font-semibold goudy-bookletter-1911-regular'>Create Account</h1>
                <p className='text-lg lg:text-xl py-4'>
                    <span className='text-[#92C0E9] goudy-bookletter-1911-regular'>Already have account</span>
                    <span className='mx-6 border-b border-[#2572e7] font-semibold'>
                        <Link href="/Auth">Sign In</Link>
                    </span>
                </p>
            </div>
            <div className=' lg:w-[60%] mx-auto'>
                <form onSubmit={handleSignUp}>
                    <div className='mt-2'>
                        <legend className="fieldset-legend text-black goudy-bookletter-1911-regular  text-lg lg:text-xl">Name</legend>
                        <input type="text" name='name' placeholder="Enter your Name" className=" h-10 bg-black hover:bg-black focus:bg-black text-white w-full  border-none shadow-none  text-sm  px-5 font-semibold rounded-lg" required />
                    </div>
                    <div className='mt-2'>
                        <legend className="fieldset-legend text-black  goudy-bookletter-1911-regular text-lg lg:text-xl">Email</legend>
                        <input type="email" name='email' placeholder="Enter your email" className=" h-10 bg-black hover:bg-black focus:bg-black text-white w-full  border-none shadow-none text-sm px-5 font-semibold rounded-lg" required />
                    </div>

                    <div className='mt-2'>
                        <legend className="fieldset-legend text-black goudy-bookletter-1911-regular text-lg lg:text-xl">Password</legend>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter password" className={`h-10 bg-black text-white w-full border-none shadow-none text-sm  px-5 font-semibold rounded-lg pr-12 ${passwordError ? "border-red-500" : ""}`} required />

                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-2 text-xl" >
                                {showPassword ? <FaRegEye className='text-white' /> : <FaEyeSlash className='text-white' />}
                            </button>
                        </div>
                        {passwordError && <p className="text-red-500 text-sm mt-1">Weak password. Must include uppercase, number, and 8+ characters.</p>}
                    </div>
                    <div className='mt-2'>
                        <legend className="fieldset-legend text-black goudy-bookletter-1911-regular text-lg lg:text-xl">Confirm Password</legend>
                        <div className="relative">
                            <input
                                type={showconfirmPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                placeholder="Enter confirm password"
                                className={`h-10 bg-black hover:bg-black focus:bg-black text-white w-full border-none shadow-none text-sm px-5 font-semibold rounded-lg pr-12 ${confirmError ? "border-red-500" : ""}`}
                                required />
                            <button
                                type="button"
                                onClick={() => setshowconfirmPassword(!showconfirmPassword)}
                                className="absolute right-4 top-2 text-xl">
                                {showconfirmPassword ? <FaRegEye className='text-white' /> : <FaEyeSlash className='text-white' />}
                            </button>
                        </div>
                        {confirmError && <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>}
                    </div>
                    <div className='mt-6'>
                        <button className='btn w-full shadow-2xs rounded-full bg-[#92C0E9]  goudy-bookletter-1911-regular text-lg lg:text-xl text-black border-none'>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;