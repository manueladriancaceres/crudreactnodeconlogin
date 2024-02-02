import { useForm } from "react-hook-form"
// import { registerRequest } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors }  = useAuth();
    // console.log(user);

    const navigate = useNavigate();
    useEffect(()=>{
        if (isAuthenticated) navigate("/tasks")
    },[isAuthenticated])

    const onSumbit = handleSubmit(
        async (values) => { 
            console.log('ejecuto') ;
            //const res = await registerRequest(values);
            //console.log(res);
            signup(values)
    })

    return (
        <div className="bg-zinc-800" style={{ maxWidth: "md" }} p={10} >
            {
                RegisterErrors.map((error,i)=> {
                    <div className="bg-red-500 p-2" key={i}>
                        {error}
                    </div>
                })
            }
            <form onSubmit={onSumbit}>
                User name: <input type="text" {...register("username", { required: true })} 
                    className="w-ful bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="user name"
                />
                {
                    errors.username && (
                        <p className="text-red-500">Username is required</p>
                    )
                }
                <br/>
                email: <input type="email" {...register("email", { required: true })} 
                    className="w-ful bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="email"
                />
                {
                    errors.email && (
                        <p className="text-red-500">email is required</p>
                    )
                }
                <br/>
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
                <button type="submit">Registrar</button>
            </form>

        </div>
    )
}
export default RegisterPage