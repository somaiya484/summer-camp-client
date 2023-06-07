import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Lottie from "lottie-react";
import loginAnimation from "../../assets/anim/login.json";

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch('password'); 
    const [showpass, setShowPass] = useState(false)
    const onSubmit = data => {
        console.log(data);
    };
    return (
        <div>
            <Helmet>
                <title>PlayTime Sports | Signup</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center hidden md:block md:w-1/2 max-w-lg">
                    <Lottie animationData={loginAnimation} loop={true} />;
                    </div>
                    <div className="card flex md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h3 className='text-3xl text-center font-semibold'>Please Signup</h3>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" className="input input-bordered" {...register("name")} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='flex items-center'>
                                    <input name='password' type={showpass ? 'text' : 'password'} placeholder="password" className="input input-bordered w-full" {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/ })} />
                                    <span className='-ml-8'>{showpass ? <AiFillEyeInvisible onClick={() => setShowPass(!showpass)} title='hide password' /> : <AiFillEye onClick={() => setShowPass(!showpass)} title='show password' />}</span>
                                </div>
                                {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must have a captial Letter and a special char</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-600'>Password Length Must be 6</span>}
                            </div>
                            <div className='form-control'>
                            <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <div className='flex items-center'>
                                    <input type={showpass ? 'text' : 'password'} placeholder="confirm password" className="input input-bordered w-full" {...register("confirmPassword", { required: true, 
                                    validate: (value) => value === password || "Passwords do not match" // Add custom validation rule
                                    })} />
                                    <span className='-ml-8'>{showpass ? <AiFillEyeInvisible onClick={() => setShowPass(!showpass)} title='hide password' /> : <AiFillEye onClick={() => setShowPass(!showpass)} title='show password' />}</span>
                                </div>
                                {errors.confirmPassword && <span className='text-red-600'>{errors.confirmPassword.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="Photo URL" className="input input-bordered" {...register("photoURL")} />
                            </div>
                            <div className="form-control">
                                <button type='submit' className="btn my-custom-btn">Signup</button>
                            </div>
                            <Link to='/login'><p className='text-center'>Alreday have an account? Login</p></Link>
                        </form>
                        {/* <SocialLogin /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;