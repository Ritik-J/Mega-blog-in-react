import React from "react";
import appwriteService from "../AppwriteServices/Configuration";
import {Link} from "react-router-dom";
import "./index.css";

function PostCard({$id, Title, featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4 border-t-red-800 border-l-red-800 border-b-black border-r-black border-4">
                <div className="w-full justify-center mb-4">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={Title} className="roundex-xl" />
                </div>
                <h2 className="text-xl font-bold">{Title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
