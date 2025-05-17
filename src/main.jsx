import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Layout from './Layout'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Post from './screens/post';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Login  /> },
      { path: 'home', element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'post', element: <Post /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
