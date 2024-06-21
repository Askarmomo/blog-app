import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const api = await axios.put('http://localhost:5000/editpost/' + id, { title, desc })
            if (api.data === 'success') {
                window.location.href ='/'
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    useEffect(() => {
        axios.get('http://localhost:5000/getpostbyid/' + id)
            .then((result) => {
                setTitle(result.data.title)
                setDesc(result.data.desc)
            })
            .catch((err) => console.log(err.message))
    }, [id])

    return (
        <div>
            <div className=" pt-20">
                <form onSubmit={handleSubmit} className=" bg-zinc-200 max-w-xl mx-auto p-4 space-y-4 rounded">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" type="text" className=" p-2 rounded outline-none  w-full" />
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter Description" className=" p-2 rounded outline-none w-full" name="desc" id="desc" cols={'10'} rows={'10'}></textarea>
                    <button className=" w-full p-2 rounded bg-blue-500 hover:bg-blue-600 font-semibold text-white">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditPost;