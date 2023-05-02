import { Link } from "react-router-dom";


const BlogList = ({ blogs }) => {

    return (
        <div className="blog-list">
            {blogs.map(blog => ( 
                <article className="blog-article" key={blog._id}>
                    <Link to={`/${blog._id}`}>
                        <img src={`http://localhost:3500/${blog.image}`} alt="blog preview"></img>
                        <h2>{blog.title}</h2>
                    </Link>
                </article> 
            ))}
           
        </div>
        
    );
}
 
export default BlogList;