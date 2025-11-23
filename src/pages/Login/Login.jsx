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
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName || "No Name",
                    image: result.user.photoURL || "",
                    last_log_in: new Date().toISOString(),
                };
                axiosInstance.post("/users", userInfo).catch(err => console.error("DB Update Error:", err));

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

                axiosInstance.post("/users", userInfo).catch(err => console.error("DB Update Error:", err));
                Swal.fire("Success", "Google Sign-in Successful!", "success");
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire("Error", error.message, "error");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <h2 className="text-3xl font-bold text-[#5f0f40] text-center">Login to DiscourseHub</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div>
                        <label className="block mb-1 font-medium text-[#9a031e]">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className={`input input-bordered w-full border-[#e36414] focus:border-[#fb8b24] ${errors.email ? "input-error" : ""}`}
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-[#9a031e]">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className={`input input-bordered w-full border-[#e36414] focus:border-[#fb8b24] ${errors.password ? "input-error" : ""}`}
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-[#5f0f40] via-[#9a031e] to-[#fb8b24] text-white font-bold py-2 rounded-lg shadow hover:opacity-90 transition">
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-700">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-[#e36414] hover:underline">Register here</Link>
                </p>

                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 w-full py-2 border-2 border-[#e36414] rounded-lg shadow hover:bg-[#e36414] hover:text-white transition mt-4 font-semibold"
                >
                    <FcGoogle size={22} />
                    Login with Google
                </button>
            </div>
        </div>
    );
}
