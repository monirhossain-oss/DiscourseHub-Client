import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reportedComments = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedComments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/reported-comments');
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this comment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/admin/comments/${id}`);
                await refetch();
                Swal.fire('Deleted!', 'The comment has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete the comment.', 'error');
                console.log(error)
            }
        }
    };

    const handleUnreport = async (id) => {
        try {
            await axiosSecure.patch(`/admin/comments/${id}/unreport`);
            await refetch();
            Swal.fire('Updated!', 'Marked as reviewed.', 'success');
        } catch (error) {
            Swal.fire('Error!', 'Failed to update the comment.', 'error');
            console.log(error)
        }
    };

    // Skeleton Loader with Framer Motion animation
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="px-1 w-full bg-gray-300 rounded-2xl py-6 animate-pulse"
            >
                <h2 className="text-xl font-semibold mb-4 text-center bg-gray-200 h-6 w-60 mx-auto rounded"></h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full text-sm">
                        <thead>
                            <tr>
                                {[...Array(6)].map((_, i) => (
                                    <th key={i} className="h-6 bg-gray-200 rounded">&nbsp;</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                                <tr key={i}>
                                    {[...Array(6)].map((_, j) => (
                                        <td key={j}>
                                            <div className="h-6 w-full bg-gray-200 rounded">&nbsp;</div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-1 w-full bg-gray-300 rounded-2xl py-6"
        >
            <h2 className="text-xl font-semibold mb-4 text-center">📢 Reported Comments</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm">
                    <thead className="text-sm bg-white">
                        <tr>
                            <th className="whitespace-nowrap">Reported By</th>
                            <th className="whitespace-nowrap">Reported User</th>
                            <th className="whitespace-nowrap">Comment</th>
                            <th className="whitespace-nowrap">Feedback</th>
                            <th className="whitespace-nowrap">Report Date</th>
                            <th className="whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportedComments.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-4 text-sm">
                                    No reported comments
                                </td>
                            </tr>
                        )}

                        {reportedComments.map(comment => (
                            <motion.tr
                                key={comment._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="hover:bg-gray-100 transition"
                            >
                                <td className="whitespace-nowrap">{comment.reportedByEmail || 'Anonymous'}</td>
                                <td className="whitespace-nowrap">{comment.authorEmail || 'N/A'}</td>
                                <td
                                    className="max-w-[200px] truncate whitespace-nowrap overflow-hidden"
                                    title={comment.text}
                                >
                                    {comment.text}
                                </td>
                                <td className="whitespace-nowrap">{comment.feedback || 'N/A'}</td>
                                <td className="whitespace-nowrap">
                                    {new Date(comment.reportedAt || comment.createdAt).toLocaleString()}
                                </td>
                                <td className="space-x-1 flex flex-wrap gap-1">
                                    <button
                                        onClick={() => handleDelete(comment._id)}
                                        className="btn btn-error btn-xs"
                                        aria-label="Delete comment"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleUnreport(comment._id)}
                                        className="btn btn-success btn-xs"
                                        aria-label="Mark as reviewed"
                                    >
                                        Reviewed
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ReportedComments;
