import { Link, Outlet } from "react-router";
import authImage from '../../assets/3d-render-secure-login-password-illustration.jpg'
import logo from '../../assets/logo.png'

export default function AuthLayout() {
    return (
        <div>
            <Link to="/" className="flex items-center gap-2 mt-4 font-bold text-xl">
                <img src={logo} alt="Logo" className="w-1/4  h-10 rounded-full" />
            </Link>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
                {/* Left Image Section */}
                <div className="md:w-1/3 hidden md:flex items-center justify-center p-4 ">
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
                    </div>

                </div>
            </div>
        </div>
    );
}
