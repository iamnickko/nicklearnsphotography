import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const EditBlog = () => {
    const { user } = useAuthContext()
    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [catalogue, setCatalogue] = useState('')
    const [error, setError] = useState(null)

   

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`https://nicklearnsphotography.onrender.com/api/blogs/${id}`)
            const json = await response.json()
            console.log('useeffect ', json)
            setTitle(json.title)
            setSummary(json.summary)
            setCatalogue(json.catalogue)
        };
        fetchBlog();
    }, [id])

    if (!user) {
        return <Navigate to="/" />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const blog = { title, summary, catalogue }
        const response = await fetch(`https://nicklearnsphotography.onrender.com/api/blogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        })

        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setSummary('')
            setCatalogue('')
        }

    }


    return (
        <div className="form">
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <h2>Edit this blog post</h2>
                <fieldset>
                    <label>Title</label>
                    <input 
                        type="title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    ></input>
                    <label>Summary</label>
                    <input 
                        type="summary"
                        value={summary}
                        onChange={(e) => {
                            setSummary(e.target.value)
                        }}
                    ></input>
                    <label>Catalogue
                        <select 
                            id="selectCatalogue" 
                            value={catalogue} 
                            onChange={(e) => {setCatalogue(e.target.value)}}>
                                <option value="select">-- Choose one --</option>
                                <option value="landscape">Landscape</option>
                                <option value="wildlife">Wildlife</option>
                        </select>
                    </label>
                </fieldset>   
                <button>Update Blog</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
}
 
export default EditBlog;