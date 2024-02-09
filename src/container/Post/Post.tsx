import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { ApiPost } from '../../type';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import { format } from 'date-fns';

const Post = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<ApiPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosApi.get<ApiPost>('/posts/' + params.id + '.json');
      setPost(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке поста:', error);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost, params.id]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axiosApi.delete('/posts/' + params.id + '.json');
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !post) {
    return <Spinner />;
  }

  return (
    <div>
      <span className="text-muted" style={{ fontSize: '10px' }}>{format(new Date(post.createdAt), 'dd.MM.yyyy HH:mm')}</span>
      <h2>{post.title}</h2>
      <article>{post.description}</article>
      <div>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        <Link to={`/posts/${params.id}/edit`} className="btn btn-success">Edit</Link>
      </div>
    </div>
  );
};

export default Post;