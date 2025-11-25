import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

const AddAnnouncement = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const { data: userInfo = {} } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const { mutate: addAnnouncement, isLoading } = useMutation({
        mutationFn: async (data) => {
            const announcement = {
                ...data,
                createdAt: new Date().toISOString(),
            };
            const res = await axiosSecure.post('/announcements', announcement);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({ icon: 'success', title: 'Announcement Added!', timer: 1500, showConfirmButton: false });
            reset();
            queryClient.invalidateQueries(['announcements']);
        },
        onError: () => {
            Swal.fire({ icon: 'error', title: 'Failed to add announcement' });
        }
    });

    const onSubmit = (data) => {
        addAnnouncement(data);
    };

    return (
        <div className=" bg-[#faf7f5] p-6  space-y-6">
            {/* Admin Info Card */}
            <div className="flex items-center gap-4 bg-[#FB8B24]/10 p-4 rounded-lg shadow-md">
                <img
                    src={userInfo.image || user?.photoURL}
                    alt={userInfo.name || user?.displayName}
                    className="w-20 h-20 rounded-full border-4 border-[#5F0F40] object-cover"
                />
                <div>
                    <h3 className="text-xl font-bold text-[#5F0F40]">
                        {userInfo.name || user?.displayName}
                    </h3>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
            </div>

            {/* Form */}
            <h2 className="text-2xl font-bold text-[#5F0F40] text-center">Add New Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    placeholder="Announcement Title"
                    className="input input-bordered w-full border-[#FB8B24] focus:border-[#FB8B24] focus:ring-1 focus:ring-[#FB8B24]"
                />
                {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

                <textarea
                    {...register('description', { required: 'Message is required' })}
                    placeholder="Announcement description"
                    rows={4}
                    className="textarea textarea-bordered w-full border-[#FB8B24] focus:border-[#FB8B24] focus:ring-1 focus:ring-[#FB8B24]"
                ></textarea>
                {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

                <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-lg bg-[#5F0F40] text-white font-semibold hover:bg-[#9A031E] transition-colors duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Posting...' : 'Add Announcement'}
                </button>
            </form>
        </div>
    );
};

export default AddAnnouncement;
