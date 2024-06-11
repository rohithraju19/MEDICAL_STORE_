import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import App from "./App";
import ListPosts from "./components/blog/ListPost";
import CreateMedicine from "./components/blog/CreateMedicine";
import ViewPost from "./components/blog/Viewpost";
import EditPost from "./components/blog/EditPost";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <Aboutus/> },
    { path: 'blog/posts', element: <ListPosts/> },
    { path : 'blog/posts/create' , element : <CreateMedicine/> },
    { path: 'blog/posts/:postId', element: <ViewPost/>},
    { path : '/blog/posts/:postId/edit', element: <EditPost/>},
    { path: 'register', element:<Register/>},
    { path: 'Login', element:<Login/>},
   
    
]);

export default router;