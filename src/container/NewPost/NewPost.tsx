import {useState, ChangeEvent, FormEvent} from 'react';
import axiosApi from '../../axiosApi';
import {ApiPost} from '../../type';



const NewPost = () => {
  const [formData, setFormData] = useState<ApiPost >({
    title: '',
    description: '',
    createdAt: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postData: ApiPost = {
      ...formData,
      createdAt: new Date().toISOString(),
    };
    try {
      await axiosApi.post('/posts.json', postData);
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control"
            aria-label="Title"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Body</span>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control"
            aria-label="Description"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Post</button>
      </form>
    </div>
  );
};

export default NewPost;