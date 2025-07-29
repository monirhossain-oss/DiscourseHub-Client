import { Link, Outlet } from "react-router";
import authImage from '../../assets/3d-render-secure-login-password-illustration.jpg'

export default function AuthLayout() {
    return (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
            {/* Left Image Section */}
            <div className="md:w-1/3  flex items-center justify-center p-4 ">
                <img
                    src={authImage}
                    alt="Auth Illustration"
                    className="max-w-full max-h-full object-cover rounded-lg shadow"
                />
            </div>

            {/* Right Form Section */}
            <div className="md:w-1/2 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Outlet />

                    <div className="text-center mt-6">
                        <Link
                            to="/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                        >
                            🏠 Go to Home
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
