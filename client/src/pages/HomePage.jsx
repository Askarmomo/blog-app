import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {

    const [posts, setPost] = useState([])

    useEffect(() => {
        const getAllData = async () => {
            try {
                const postdata = await axios.get('http://localhost:5000/getposts')
                setPost(postdata.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        getAllData()
    }, [])

    return (
        <div>

            {
                posts.map(post => (
                    <Link to={'/post/' + post._id} key={post._id}>
                        <div className=" bg-zinc-200 rounded p-2 max-w-2xl mb-4 mx-auto">
                            <img src={`http://localhost:5000/images/${post.file}`} alt="images" />
                            <h3>{post.title}</h3>
                            <p>{post.desc}</p>
                        </div>
                    </Link>
                ))
            }

        </div>
    );
}

export default HomePage;