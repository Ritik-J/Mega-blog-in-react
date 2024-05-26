import React from "react";

import {Container, Logo, LogoutBtn} from "./Index";

import {Link} from "react-router-dom";

import {useSelector} from "react-redux";

import {useNavigate} from "react-router-dom";

import "./index.css";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All-Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="py-4 max-w-full text-white border-t-red-800 border-l-red-800 border-b-black border-r-black border-2 rounded-lg">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-block px-6 py-2 hover:text-yellow-200 rounded-full font-semibold "
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
