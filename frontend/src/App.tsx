import { Routes, Route } from 'react-router-dom';
import { Avatar, Container } from '@mui/material';
import AppToolBar from './Components/Toolbar/AppToolBar';
import Posts from './Features/Posts/Posts';
import PostDetails from './Features/Posts/PostDetails';
import Login from './Features/Users/Login';
import Register from './Features/Users/Register';
import AddNewPost from './Features/Posts/AddNewPost';


const App = () => {
  return (
    <>
      <main>
        <header>
          <AppToolBar/>
        </header>
        <Container maxWidth="fixed">
          <Routes>
            <Route path="/" element={(<Posts/>)}/>
            <Route path="/post/:id" element={(<PostDetails/>)}/>
            <Route path="/login" element={(<Login/>)}/>
            <Route path="/register" element={(<Register/>)}/>
            <Route path="/addPost" element={(<AddNewPost/>)}/>
            <Route path="*" element={(
              <Avatar src="https://www.searchenginejournal.com/wp-content/uploads/2009/05/reddit404top.png"
                      sx={{ width: 450,height: 284 , position: 'absolute', top: '40%', left: '33%'}}/>
            )}/>
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
