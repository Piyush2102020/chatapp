import { useNavigate } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";

export default function NavigationView() {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState("home"); 

    useEffect(() => {
        
        if (!selectedItem) {
            setSelectedItem("home");
        }
    }, [selectedItem]);

 
    const handleNavigation = (path:string) => {
        setSelectedItem(path);
        navigate(path); 
    };

    return (
        <div id="navbar" className="navigation-bar">
            <div
                className={`icon-base ${selectedItem === "home" ? "active" : ""}`}
                data-path="home"
                onClick={() => handleNavigation("home")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="inherit"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                </svg>
            </div>

            <div
                className={`icon-base ${selectedItem === "search" ? "active" : ""}`}
                data-path="search"
                onClick={() => handleNavigation("search")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="inherit"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </div>

            <div
                className={`icon-base button-add ${selectedItem === "post" ? "active" : ""}`}
                data-path="post"
                onClick={() => handleNavigation("post")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="inherit"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>

            <div
                className={`icon-base ${selectedItem === "profile" ? "active" : ""}`}
                data-path="profile"
                onClick={() => handleNavigation("profile")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="inherit"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
            </div>
        </div>
    );
}
