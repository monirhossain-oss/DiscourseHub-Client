import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
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
        <div className="  p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
