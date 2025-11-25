import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddTag = () => {
    const axiosSecure = useAxiosSecure();
    const [tagName, setTagName] = useState('');

    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!tagName.trim()) return;

        try {
            await axiosSecure.post('/tags', { name: tagName.trim() });
            Swal.fire({
                icon: 'success',
                title: 'Tag Added Successfully',
                timer: 1500,
                showConfirmButton: false
            });
            setTagName('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Tag Already Exists or Error',
            });
            console.log(error)
        }
    };

    return (
        <div className=" bg-white p-6">
            <h2 className="text-2xl text-center font-bold text-[#5F0F40] mb-6">
                Add New Tag
            </h2>
            <form onSubmit={handleAddTag} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter tag name"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    className="input input-bordered w-full border-[#FB8B24] focus:border-[#FB8B24] focus:ring-1 focus:ring-[#FB8B24] text-gray-700"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-[#5F0F40] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#9A031E] transition-colors duration-300"
                >
                    Add Tag
                </button>
            </form>
        </div>

    );
};

export default AddTag;
