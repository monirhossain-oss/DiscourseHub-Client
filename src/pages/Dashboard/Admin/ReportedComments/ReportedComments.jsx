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

    const primaryDark = "#5F0F40";
    const primaryRed = "#9A031E";
    const accentOrange = "#FB8B24";

    // DELETE COMMENT
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Delete comment?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: primaryRed
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.delete(`/admin/comments/${id}`);
            refetch();
            Swal.fire('Deleted!', 'Comment removed successfully.', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire('Error!', 'Failed to delete comment.', 'error');
        }
    };

    // UNREPORT COMMENT
    const handleUnreport = async (id) => {
        try {
            await axiosSecure.patch(`/admin/comments/${id}/unreport`);
            refetch();
            Swal.fire('Success', 'Marked as reviewed.', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire('Error!', 'Failed to update.', 'error');
        }
    };

    // SKELETON
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-2 w-full rounded-2xl py-6 animate-pulse"
                style={{ backgroundColor: accentOrange + "20" }}
            >
                <div className="h-6 w-64 bg-gray-300 mx-auto rounded"></div>
                <div className="overflow-x-auto mt-4">
                    <table className="table w-full">
                        <thead>
                            <tr>{[...Array(6)].map((_, i) => (
                                <th key={i}><div className="h-6 bg-gray-300 rounded"></div></th>
                            ))}</tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                                <tr key={i}>
                                    {[...Array(6)].map((_, j) => (
                                        <td key={j}>
                                            <div className="h-6 bg-gray-300 rounded"></div>
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
            className="px-2 w-full py-6 shadow-md"
            style={{ backgroundColor: accentOrange + "20" }}
        >
            {/* Title */}
            <h2
                className="text-xl font-bold mb-5 text-center"
                style={{ color: primaryDark }}
            >
                 Reported Comments
            </h2>

            <div className="overflow-x-auto">
                <table className="table w-full text-sm">

                    {/* Table Head */}
                    <thead style={{ backgroundColor: accentOrange }}>
                        <tr className="text-white">
                            <th>Reported By</th>
                            <th>Reported User</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Report Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>

                        {reportedComments.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-600">
                                    No reported comments
                                </td>
                            </tr>
                        )}

                        {reportedComments.map((c) => (
                            <motion.tr
                                key={c._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    transition: "0.2s",
                                }}
                                className="hover:bg-opacity-20 hover:text-black"
                            >
                                <td>{c.reportedByEmail || "Anonymous"}</td>
                                <td>{c.authorEmail || "N/A"}</td>

                                <td title={c.text} className="max-w-[200px] truncate">
                                    {c.text}
                                </td>

                                <td>{c.feedback || "N/A"}</td>

                                <td>{new Date(c.reportedAt || c.createdAt).toLocaleString()}</td>

                                <td className="flex flex-wrap gap-1">

                                    {/* Delete btn */}
                                    <button
                                        onClick={() => handleDelete(c._id)}
                                        className="btn btn-xs text-white"
                                        style={{ backgroundColor: primaryRed }}
                                    >
                                        Delete
                                    </button>

                                    {/* Unreport btn */}
                                    <button
                                        onClick={() => handleUnreport(c._id)}
                                        className="btn btn-xs text-white"
                                        style={{ backgroundColor: primaryDark }}
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
