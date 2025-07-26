import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');

    const debouncedSearchText = useDebounce(searchText, 500);

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', debouncedSearchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${debouncedSearchText}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to make this user an admin?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Make Admin',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${id}/make-admin`).then(res => {
                    if (res.data.message === 'User role updated to admin') {
                        Swal.fire('Success', 'User promoted to admin!', 'success');
                        refetch();
                    } else {
                        Swal.fire('Oops!', 'Could not promote user.', 'error');
                    }
                }).catch(err => {
                    console.error(err);
                    Swal.fire('Error', 'Something went wrong', 'error');
                });
            }
        });
    };

    const handleRemoveAdmin = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to remove this admin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Remove Admin',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${id}/remove-admin`)
                    .then(res => {
                        if (res.data.message === 'User role updated to user') {
                            Swal.fire('Removed!', 'Admin rights removed!', 'success');
                            refetch();
                        } else {
                            Swal.fire('Oops!', 'Could not remove admin.', 'error');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire('Error', 'Something went wrong', 'error');
                    });
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'User has been deleted.', 'success');
                        refetch();
                    }
                });
            }
        });
    };

    if (isLoading) {
        return <div className="text-center py-8">Loading users...</div>;
    }

    return (
        <div className="p-4 bg-gray-300 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>

            {/* Search Field */}
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="input input-bordered w-full max-w-md"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className=''>
                        <tr className=' text-black bg-white'>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role === 'admin' ? 'badge-success' : 'badge-info'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="space-x-2">
                                        {user.role === 'admin' ? (
                                            <button
                                                onClick={() => handleRemoveAdmin(user._id)}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Remove Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user._id)}
                                                className="btn btn-sm btn-success"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
