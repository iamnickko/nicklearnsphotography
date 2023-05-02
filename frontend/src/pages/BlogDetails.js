import { Link, useParams } from "react-router-dom";
import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from "../hooks/useAuthContext";


const BlogDetails = () => {
    const { user } = useAuthContext()
    const {id} = useParams()
    const { blogs, dispatch } = useBlogsContext()
    const blogDetails = blogs.filter((b) => b._id === id)
    


    // delete method
    const handleClick = async () => {
        
        if (!user) {
            return
        }
        const response = await fetch(`https://nicklearnsphotography.onrender.com/api/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json
        if (response.ok) {
            dispatch({type: 'DELETE_BLOG', payload: json})
        }
    }
    
    return (
            <div className="blog-details">
                <div className="go-back">
                    <Link to='/'>
                        <p>&larr; Go Back</p>
                    </Link>
                </div>
                <div className="blog-image">
                    <img src={`https://nicklearnsphotography.onrender.com/${blogDetails[0].image}`} alt={blogDetails[0].title} />
                </div>
                <div className="blog-text">
                    <h2>{blogDetails[0].title}</h2> 
                    <p>{blogDetails[0].summary}</p>
                </div>
                { user && (
                    <div>
                        <span onClick={handleClick}>delete</span>
                        <Link to="edit">Edit</Link>
                    </div>
                )}
                
            
        </div> 
    
    );
}
 
export default BlogDetails;