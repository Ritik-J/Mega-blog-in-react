import React from "react";
import {useDispatch} from "react-redux";
import authService from "../AppwriteServices/Auth";
import {logout} from "../AuthSlice";
import "./index.css";

function LogoutBtn() {
    const dispatch = useDispatch();
    const LogoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };
    return (
        <button
            className="inline-block px-6 py-2 text-white rounded-lg hover:font-bold bg-gradient-to-r from-black to-red-600"
            onClick={LogoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
