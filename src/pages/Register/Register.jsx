import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
    const { register: registerForm, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const { createUser, googleSignIn, updateUserProfile } = useAuth();
    const [uploading, setUploading] = useState(false);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        setUploading(true);
        try {
            // Upload photo
            const formData = new FormData();
            formData.append("image", data.photo[0]);
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebb_api_key}`, formData);
            const photoURL = res.data.data.url;

            // Create user in Firebase Auth
            const userCredential = await createUser(data.email, data.password);
            const user = userCredential.user;
            console.log(user)

            // Update Firebase user profile
            await updateUserProfile({ displayName: data.name, photoURL });

            // Silent DB upsert
            const userInfo = {
                name: data.name,
                email: data.email,
                image: photoURL,
                role: "user",
                isMember: false,
                badge: "bronze",
                created_At: new Date().toISOString(),
                last_log_in: new Date().toISOString(),
            };
            axiosInstance.post("/users", userInfo)
                .catch(err => console.error("DB Update Error:", err));

            Swal.fire("Success", "Registration Successful!", "success");
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setUploading(false);
        }
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (result) => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName || "No Name",
                    email: user.email,
                    image: user.photoURL || "",
                    role: "user",
                    badge: "bronze",
                    isMember: false,
                    created_At: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                };
                axiosInstance.post("/users", userInfo)
                    .catch(err => console.error("DB Update Error:", err));

                Swal.fire("Success", "Google Sign-in Successful!", "success");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto p-6 shadow">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                <input
                    type="file"
                    {...registerForm("photo", { required: "Profile photo is required" })}
                    className="file-input w-full"
                />
                {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                <input
                    type="text"
                    {...registerForm("name", { required: "Name is required" })}
                    placeholder="Name"
                    className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                <input
                    type="email"
                    {...registerForm("email", { required: "Email is required" })}
                    placeholder="Email"
                    className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <input
                    type="password"
                    {...registerForm("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                    placeholder="Password"
                    className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                <button type="submit" disabled={uploading} className="btn btn-primary w-full">
                    {uploading ? "Registering..." : "Register"}
                </button>
            </form>
            <p className="mt-2 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full mt-3 flex items-center justify-center gap-2"
            >
                <FcGoogle size={22} /> Register with Google
            </button>
        </div>
    );
};

export default Register;
