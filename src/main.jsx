import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {Provider} from "react-redux";
import store from "./Store.js";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Protected from "./Components/AuthenticationLayout.jsx";
import HomePage from "./Components/HomePage.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import SignupPage from "./Components/SingupPage.jsx";
import AllPostPage from "./Components/AllPostPage.jsx";
import AddPostPage from "./Components/AddPostPage.jsx";
import EditPostPage from "./Components/EditPostPage.jsx";
import PostPage from "./Components/PostPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: (
                    <Protected authentication={false}>
                        <LoginPage />
                    </Protected>
                ),
            },
            {
                path: "/signup",
                element: (
                    <Protected authentication={false}>
                        <SignupPage />
                    </Protected>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <Protected authentication>
                        <AllPostPage />
                    </Protected>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <Protected authentication>
                        <AddPostPage />
                    </Protected>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <Protected authentication>
                        <EditPostPage />
                    </Protected>
                ),
            },
            {
                path: "/post/:slug",
                element: <PostPage />,
            },
        ],
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
