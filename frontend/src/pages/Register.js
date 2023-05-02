import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register, isLoading, error } = useRegister()
    const { user } = useAuthContext()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        await register(email, password)
    }
    if (user) {
        return <Navigate to='/' />
    }
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>
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
                <button disabled={isLoading}>Register</button>
                { error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}
 
export default Register;