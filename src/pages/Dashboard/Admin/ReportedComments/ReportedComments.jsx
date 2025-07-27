import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reportedComments = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedComments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/reported-comments');
            return res.data;
        }
    });
    console.log(reportedComments)

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

    if (isLoading) {
        return <p className="text-center py-8">Loading reported comments...</p>;
    }

    return (
        <div className="px-1 w-full bg-gray-300 rounded-2xl py-6">
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
                            <tr key={comment._id}>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default ReportedComments;
