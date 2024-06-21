import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostPage = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:5000/getpostbyid/' + id)
            .then(res => setPost(res.data))
            .catch(err => console.log(err))
    }, [id])

    const handleDelete = async (id) => {

        try {
            await axios.delete('http://localhost:5000/deletepost/' + id)
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <div className=" bg-zinc-200 rounded p-2 max-w-xl mx-auto ">
            <div>
                <img src={'http://localhost:5000/images/' + post.file} alt="images" />
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
            </div>
            <div className=" space-x-2">
                <button className=" p-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold"><Link to={`/editpost/${post._id}`}>Edit</Link></button>
                <button onClick={() => handleDelete(post._id)} className=" p-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold">Delete</button>
            </div>
        </div>
    );
}

export default PostPage;