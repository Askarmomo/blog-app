import axios from "axios";
import { useState } from "react";

const CreatePost = () => {
    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [file, setFile] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('title', title)
        formdata.append('desc', desc)
        formdata.append('file', file)
        try {
            await axios.post('http://localhost:5000/create', formdata)
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <div>
            <div className=" pt-20">
                <form onSubmit={handleSubmit} className=" bg-zinc-200 max-w-xl mx-auto p-4 space-y-4 rounded">
                    <input onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" type="text" className=" p-2 rounded outline-none  w-full" />
                    <textarea onChange={(e) => setDesc(e.target.value)} placeholder="Enter Description" className=" p-2 rounded outline-none w-full" name="desc" id="desc" cols={'10'} rows={'10'}></textarea>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" />
                    <button className=" w-full p-2 rounded bg-blue-500 hover:bg-blue-600 font-semibold text-white">post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;