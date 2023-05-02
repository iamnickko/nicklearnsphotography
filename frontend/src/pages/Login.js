import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()
    const { user } = useAuthContext()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)    
    }
    
    if (user) {
        return <Navigate to="/" />
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <fieldset>
                    <label>Email</label>
                    <input 
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        value={email}
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} 
                        value={password}
                    />
                </fieldset>
                <button disable={isLoading}>Login</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
}
 
export default Login;