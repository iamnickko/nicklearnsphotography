import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import { useBlogsContext } from "../hooks/useBlogsContext";
import HeroImage from "../components/HeroImage";
import About from "../components/About";

const Home = () => {
    const { blogs, dispatch } = useBlogsContext()
    const [blogFilter, setBlogFilter] = useState('landscape')

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('https://nicklearnsphotography-api.onrender.com/api/blogs', {
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BLOGS', payload: json})
            }
        }
        fetchBlogs()
    }, [dispatch])

    const handleClick = (e) => {
        setBlogFilter(e.target.value)
    }

    return (
        <div>
            <HeroImage />
            <About />
            <div className="blogbtns">
                <button className="homebtns" onClick={handleClick} value='landscape' autoFocus>Landscapes</button>
                <button className="homebtns" onClick={handleClick} value='wildlife'>Wildlife</button>
            </div>
            { blogs && <BlogList blogs={blogs.filter(blog => blog.catalogue === blogFilter)}/> }
        </div>
    );
}
 
export default Home;