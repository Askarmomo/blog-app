import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password })
            alert(response.data)
            if (response.data === "success") {
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className=" pt-20">
            <div className=" bg-zinc-300 rounded mx-auto max-w-lg p-4 ">
                <h2 className=" font-semibold text-xl pb-3">LogIn</h2>
                <form onSubmit={handleSubmit} className=" space-y-3">
                    <div>
                        <label htmlFor="email" className=" font-semibold">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className=" p-1.5 rounded w-full outline-none" placeholder="Enter Email" />
                    </div>
                    <div>
                        <label htmlFor="pasword" className=" font-semibold">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******" className=" placeholder:font-semibold outline-none p-1.5 rounded w-full" />
                    </div>
                    <button className="font-semibold w-full p-1.5 rounded bg-cyan-500 hover:bg-cyan-600">LogIn</button>
                    <p className=" font-semibold pb-1">If You Not Have An Account ?</p>

                    <Link to={'/register'} ><div className=" font-semibold w-full p-1.5 rounded text-center bg-lime-500 hover:bg-lime-600 ">Register</div></Link>
                </form>
            </div>
        </div>
    );
}

export default LogIn;