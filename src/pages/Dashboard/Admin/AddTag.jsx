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
        <div className=" p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Tag</h2>
            <form onSubmit={handleAddTag} className="space-y-3 bg-white p-4 rounded shadow">
                <input
                    type="text"
                    placeholder="Enter tag name"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-primary w-full">Add Tag</button>
            </form>
        </div>
    );
};

export default AddTag;
