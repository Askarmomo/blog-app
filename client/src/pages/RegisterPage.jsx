import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/register', { username, email, password })
            console.log(response);
            navigate('/login')
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className=" pt-20">
            <div className=" bg-zinc-300 rounded mx-auto max-w-lg p-4 ">
                <h2 className=" font-semibold text-xl pb-3">Sing Up</h2>
                <form onSubmit={handleSubmit} className=" space-y-3">
                    <div>
                        <label htmlFor="name" className=" font-semibold">UserName</label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} className=" w-full p-1.5  outline-none rounded" placeholder="Enter Name" />
                    </div>
                    <div>
                        <label htmlFor="name" className=" font-semibold">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className=" p-1.5 rounded w-full outline-none" placeholder="Enter Email" />
                    </div>
                    <div>
                        <label htmlFor="name" className=" font-semibold">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="******" className=" placeholder:font-semibold outline-none p-1.5 rounded w-full" />
                    </div>
                    <button className="font-semibold w-full p-1.5 rounded bg-cyan-500 hover:bg-cyan-600">Sing Up</button>
                    <p className=" font-semibold">Already Have An Account ?</p>

                    <Link to={'/login'} ><div className=" font-semibold w-full p-1.5 rounded text-center bg-lime-500 hover:bg-lime-600 ">LogIn</div></Link>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;