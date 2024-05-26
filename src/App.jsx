import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import authService from "./AppwriteServices/Auth";
import {login, logout} from "./AuthSlice";

import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {Outlet} from "react-router-dom";

function App() {
    // creating a loading state to show something while data is being processed form database or servers
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // creating a useeffect to hook to check if the current user is loged in or not

    useEffect(() => {
        authService
        .getCurrentUser()
        .then((userData) => {
            if (userData) {
                dispatch(login({userData}));
            } else {
                dispatch(logout());
            }
        })
        .finally(() => setLoading(false));
    }, []);

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App;
