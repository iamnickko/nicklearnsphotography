import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const CreateBlog = () => {

    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [catalogue, setCatalogue] = useState('select')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)
    

    const handleSubmit = async (e) => {
        
        if (!user) {
            setError('You must be logged in')
            return
        }
        
        e.preventDefault()
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('catalogue', catalogue)
        data.set('image', image[0])
        
        const response = await fetch('https://nicklearnsphotography.onrender.com/api/blogs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            body: data,
            credentials:'include'
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            console.log('new blog added', json, data)
            setTitle('')
            setSummary('')
            setCatalogue('')
            // reset the form
            document.getElementById('uploadFile').value= null;
            document.getElementById('selectCatalogue').value= "select";
            setError(null)
        }
    }
    

    return (
        <div className="form">
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <h2>Create A New Blog Post</h2>
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
                    <label>
                        Catalogue
                        <select 
                            id="selectCatalogue"
                            name="catalogue"
                            value={catalogue}
                            onChange={(e) => {setCatalogue(e.target.value)}}>
                                <option value="select">-- Choose one --</option>
                                <option value="landscape">Landscape</option>
                                <option value="wildlife">Wildlife</option>
                        </select>
                    </label>
                </fieldset>
                <label>Image</label>
                <input
                    id="uploadFile" 
                    type="file" 
                    name="image"
                    onChange={(e) => {
                        setImage(e.target.files);
                    }}
                />
                <button>Create Blog</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
}
 
export default CreateBlog;