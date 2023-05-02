import { useEffect } from "react";
import BlogList from "../components/BlogList";
import { useBlogsContext } from "../hooks/useBlogsContext";
import HeroImage from "../components/HeroImage";
import About from "../components/About";


const Home = () => {
    const { blogs, dispatch } = useBlogsContext()

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('http://localhost:3500/api/blogs', {
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BLOGS', payload: json})
            }
        }
        fetchBlogs()
    }, [dispatch])
        
    
    return (
        <div>
            <HeroImage />
            <About />
            { blogs && <BlogList blogs={blogs}/> }
        </div>
    );
}
 
export default Home;