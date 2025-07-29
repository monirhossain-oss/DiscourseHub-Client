import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();
    const from = location.state?.from?.pathname || "/";
    const { signIn, googleSignIn } = useAuth();

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                // Silent DB upsert
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName || "No Name",
                    image: result.user.photoURL || "",
                    last_log_in: new Date().toISOString(),
                };
                axiosInstance.post("/users", userInfo)
                    .catch(err => console.error("DB Update Error:", err));

                Swal.fire("Success", "Login Successful!", "success");
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire("Error", error.message, "error");
            });
    };

    const handleGoogleLogin = () => {
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
            .catch(error => {
                Swal.fire("Error", error.message, "error");
            });
    };

    return (
        <div className="p-8 rounded shadow w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Login to DiscourseHub</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary w-full">Login</button>
            </form>
            <p className="mt-4 text-center text-sm">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
            </p>
            <button
                onClick={handleGoogleLogin}
                className="flex items-center bg-gray-400 cursor-pointer justify-center mt-4 gap-3 w-full py-2 border-2 border-green-500 rounded-md shadow-sm hover:bg-green-500 transition"
            >
                <FcGoogle size={22} />
                <span className="text-gray-800 dark:text-white font-semibold">Login with Google</span>
            </button>
        </div>
    );
}
