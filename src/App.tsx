import Appbar from './components/Appbar/Appbar';
import {Route, Routes} from 'react-router-dom';
import Posts from './container/Posts/Posts';
import NewPost from './container/NewPost/NewPost';
import Post from './container/Post/Post';
import Contacts from './components/Contacts/Contacts';

const App = () => {

  return (
    <>
      <header>
        <Appbar/>
      </header>
      <main className='container-fluid'>
        <Routes>
          <Route path='/' element={<Posts/>} />
          <Route path='/new-post' element={<NewPost/>} />
          <Route path='/posts/:id' element={<Post/>} />
          <Route path='/posts/:id/edit' element={<NewPost/>} />
          <Route path='Contacts' element={<Contacts/>}/>
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
