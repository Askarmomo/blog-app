import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";


const NavBar = () => {
    const user = useContext(userContext)
    const navigate = useNavigate()

    const handleClick = async () => {
        const res = await axios.get('http://localhost:5000/logout')

        if (res.data === "success") {
            navigate(0)
        }
    }

    return (
        <div className=" bg-blue-950 text-white flex justify-between items-center px-8 py-4">
            <div><h3 className=" font-semibold text-2xl">Blog App</h3></div>
            <div className=" flex space-x-10">
                <a href="" className=" font-semibold text-lg">Home</a>
                <Link to="/create" className=" font-semibold text-lg">Create</Link>
                <a href="" className=" font-semibold text-lg">Contect</a>
            </div>
            {
                user.username ?
                    <div>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    :
                    <div><h5 className=" font-semibold text-lg"><Link to={'/register'}>Register/Login</Link></h5></div>
            }
        </div>
    );
}

export default NavBar;