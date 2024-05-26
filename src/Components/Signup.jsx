import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../AuthSlice";
import {Button, Input, Logo} from "./Index";
import {useDispatch} from "react-redux";
import authService from "../AppwriteServices/Auth";
import {useForm} from "react-hook-form";
import "./index.css";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [error, setError] = useState("");

    const signup = async (data) => {
        console.log(data);
        setError("");
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            type="text"
                            {...register("name", {
                                required: true,
                            })}
                        />

                        <Input
                            label="Email"
                            placeholder="Enter your Email address"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/.test(
                                            value
                                        ) || "Enter Valid Email Address",
                                },
                            })}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your Password"
                            type="password"
                            {...register("password", {
                                required: true,
                                // validate: {
                                //     matchPatern: (value) =>
                                //         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                                //         "Enter Valid Password",
                                // },
                            })}
                        />
                        {errors?.password?.message ?? null}
                        <Button type="submit" className="w-full bg-red-600">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
