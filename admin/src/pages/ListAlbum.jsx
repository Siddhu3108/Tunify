import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setData(response.data.albums);
            } else {
                toast.error("Failed to load albums");
            }
        } catch (error) {
            console.error("Error loading albums:", error);
            toast.error("Error loading albums");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    if (loading) {
        return (
            <div className='grid place-items-center min-h-[80vh]'>
                <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
            </div>
        );
    }

    return (
        <div>
            <b>All Album List</b>
            <br />
            <div>
                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Color</b>
                    <b>Action</b>
                </div>
                {data.map((item, index) => {
                    return (
                        <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                            <img src={item.image} className='w-12' alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgcolor} />
                            <p onClick={() => removeAlbum(item._id)} className='cursor-pointer'>X</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const removeAlbum = async (id) => {
    try {
        const response = await axios.post(`${url}/api/album/remove`, { id });
        if (response.data.success) {
            toast.success(response.data.message);
            // Refresh the album list after deletion
            window.location.reload();
        } else {
            toast.error("Failed to remove album");
        }
    } catch (error) {
        console.error("Error removing album:", error);
        toast.error("Error removing album");
    }
};

export default ListAlbum;