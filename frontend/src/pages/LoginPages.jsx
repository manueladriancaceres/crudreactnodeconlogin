import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, isAuthenticated, errors: SigninErros } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])

    const onSumbit = handleSubmit(
        (values) => {
            console.log(values);
            signin(values);
        });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-zinc-800" >
            {
                SigninErros.map((error, i) => {
                    <div className="bg-red-500 p-2" key={i}>
                        {error}
                    </div>
                })
            }
            <form onSubmit={onSumbit}>
                email: <input type="email" {...register("email", { required: true })}
                    className="w-ful bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="email"
                />
                {
                    errors.email && (
                        <p className="text-red-500">email is required</p>
                    )
                }
                <br />
                password: <input type="password" {...register("password", { required: true })}
                    className="w-ful bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="password"
                />
                {
                    errors.password && (
                        <p className="text-red-500">password is required</p>
                    )
                }
                <br></br>
                <button type="submit">Login</button>
            </form>
            <br></br>
            <p
                className="flex gap-x-2 justify-between text-center mt-4"

            >Don't have an account?
                <Link to="/register"
                    className="text-sky-500"
                >Sign up</Link>
            </p>

        </div>

    )
}
export default LoginPage