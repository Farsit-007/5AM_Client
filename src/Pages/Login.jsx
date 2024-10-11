import { useState } from "react";
import { useForm } from "react-hook-form"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
const Login = () => {
    const [show, setShow] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const togglePasswordVisibility = () => {
        setShow(!show);
    };

    const onSubmit = (data) => {
        const { userEmail, userPassword } = data;
        fetch('http://localhost:5000/login',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({ userEmail, userPassword })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
        reset()
    }

    return (

        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="flex bg-slate-300 flex-col  lg:mt-10 md:w-[450px] p-10 pb-4 pt-2 rounded-xl ">
                
                <div className="mb-4 text-center border-b-2">
                    <h1 className="my-2 text-3xl font-bold  ">Login</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">

                        <div>
                            <label htmlFor="email" className="block   mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="Enter your email address" className="w-full outline-none px-3 py-2 border rounded-md border-gray-200 bg-transparent " {...register("userEmail",
                                {
                                    required: true,
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid Email"
                                    }
                                }
                            )} />
                            {errors.userEmail && <small className="text-red-500 font-bold">{errors.userEmail.message}</small>}

                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm  ">Password</label>

                            </div>
                            <div className="relative">
                                <input type={show ? "text" : "password"} placeholder="Enter your password" className="w-full px-3  py-2 outline-none border rounded-md border-gray-200 bg-transparent  "
                                    {...register("userPassword",
                                        {
                                            required: true,
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])/,
                                                message: "At least one lowercase letter and one uppercase letter"
                                            }
                                        }
                                    )}
                                />
                                <span onClick={togglePasswordVisibility} className="absolute right-[2%] top-[31%]">
                                    {!show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                </span>

                            </div>
                            {errors.userPassword && <small className="text-red-500 font-bold">{errors.userPassword.message}</small>}
                        </div>


                    </div>
                    <div className="pt-1">
                        <div>
                            <button type="submit" className="w-full px-8 btn transition-colors duration-300 transform py-2 badge bg-[#5D0911] hover:bg-rose-100 rounded-md text-xl hover:text-[#5D0911]">Login</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>

    );
};

export default Login;