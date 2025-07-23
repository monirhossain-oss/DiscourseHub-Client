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
        <div className="p-6 bg-gray-300 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Author Image</label>
                    <input
                        value={userInfo.image}

                        {...register("photo", { required: "Profile photo is required" })}
                        className="file-input px-3 w-full"
                    />
                    <label className="block text-sm mb-1">Author Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        value={userInfo.name}
                        placeholder="Name"
                        className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    <label className="block text-sm mb-1">Title</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        className="input input-bordered w-full"
                        placeholder="Announcement Title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm mb-1">Message</label>
                    <textarea
                        {...register('description', { required: 'Message is required' })}
                        className="textarea textarea-bordered w-full"
                        placeholder="Announcement description"
                        rows={4}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                    {isLoading ? 'Posting...' : 'Add Announcement'}
                </button>
            </form>
        </div>
    );
};

export default AddAnnouncement;