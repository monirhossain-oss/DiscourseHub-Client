import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddAnnouncement = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

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
        <div className="p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
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
                        {...register('message', { required: 'Message is required' })}
                        className="textarea textarea-bordered w-full"
                        placeholder="Announcement Message"
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