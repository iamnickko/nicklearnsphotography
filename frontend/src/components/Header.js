import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


const Header = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    
    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <nav>
                <Link to="/"><h1>NickLearnsPhotography</h1></Link>
                <div>
                    { user && (
                        <div className="nav-divs">
                            <span>{user.email}</span>
                            <button className="logoutbtn" onClick={handleClick}>Logout</button>
                            <Link to="/create">Create</Link>
                        </div>
                    )}
                    { !user && (
                        <div className="nav-divs">
                            <Link to="/login">Login</Link>
                            {/* <Link to="/register">Register</Link> */}
                        </div>
                    )}
                </div>
            </nav>
        </header>
            

    );
}
 
export default Header;