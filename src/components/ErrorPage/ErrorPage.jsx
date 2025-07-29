import { Link, useRouteError } from 'react-router';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
            <p className="text-xl text-gray-700 mb-2">Sorry, an unexpected error has occurred.</p>
            <p className="text-md text-gray-500 mb-4">
                <i>{error.statusText || error.message}</i>
            </p>
            <Link
                to="/"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                🔙 Go to Homepage
            </Link>
        </div>
    );
};

export default ErrorPage;
