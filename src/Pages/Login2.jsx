import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Login2 = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        userEmail: '',
        userPassword: ''
    });
    const [errors, setErrors] = useState({
        userEmail: '',
        userPassword: ''
    });

    const togglePasswordVisibility = () => {
        setShow(!show);
    };

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!formData.userEmail) {
            errors.userEmail = 'Email is required';
            isValid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.userEmail)) {
            errors.userEmail = 'Invalid Email';
            isValid = false;
        }

        if (!formData.userPassword) {
            errors.userPassword = 'Password is required';
            isValid = false;
        } else if (formData.userPassword.length < 6) {
            errors.userPassword = 'Password must be at least 6 characters';
            isValid = false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(formData.userPassword)) {
            errors.userPassword = 'At least one lowercase letter and one uppercase letter';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: formData.userEmail,
                    userPassword: formData.userPassword,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });

            setFormData({
                userEmail: '',
                userPassword: ''
            });
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="flex bg-slate-300 flex-col lg:mt-10 md:w-[450px] p-10 pb-4 pt-2 rounded-xl">
                <div className="mb-4 text-center border-b-2">
                    <h1 className="my-2 text-3xl font-bold">Login</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input
                                type="email"
                                name="userEmail"
                                id="email"
                                placeholder="Enter your email address"
                                className="w-full outline-none px-3 py-2 border rounded-md border-gray-200 bg-transparent"
                                value={formData.userEmail}
                                onChange={handleInputChange}
                            />
                            {errors.userEmail && <small className="text-red-500 font-bold">{errors.userEmail}</small>}
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <div className="relative">
                                <input
                                    type={show ? "text" : "password"}
                                    name="userPassword"
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 outline-none border rounded-md border-gray-200 bg-transparent"
                                    value={formData.userPassword}
                                    onChange={handleInputChange}
                                />
                                <span onClick={togglePasswordVisibility} className="absolute right-[2%] top-[31%] cursor-pointer">
                                    {!show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                </span>
                            </div>
                            {errors.userPassword && <small className="text-red-500 font-bold">{errors.userPassword}</small>}
                        </div>
                    </div>
                    <div className="pt-1">
                        <button type="submit" className="w-full px-8 btn transition-colors duration-300 transform py-2 badge bg-[#5D0911] hover:bg-rose-100 rounded-md text-xl hover:text-[#5D0911]">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login2;
