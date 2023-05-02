import { Link } from "react-router-dom";

const ErrorBoundary = () => {
    return (
        <div className="errorboundary">
            <h1>Whoops, haven't gotten round to fixing this bug!</h1>
            <Link to='/' ><h3>Go back to the homepage</h3></Link>
        </div>
        
    );
}
 
export default ErrorBoundary;