import { useRoutes } from "react-router-dom";
import CreateAccount from "../pages/createAccount/file";
import Dashboard from "../pages/dashboard/file"; 
import Home from "../pages/home/file";
import Post from "../pages/post/file";
import Profile from "../pages/profile/file";
import Search from "../pages/search/file";

export default function Routes() {
    const routes = useRoutes([
        { path: "/auth", element: <CreateAccount /> },
        { 
            path: "/dashboard", 
            element: <Dashboard />, 
            children: [
                { index: true, element: <Home /> },
                { path: "home", element: <Home /> },
                { path: "search", element: <Search /> },
                { path: "post", element: <Post /> },
                { path: "profile", element: <Profile /> },
                { path: "profile/:username", element: <Profile /> 
                }
            ]
        }
    ]);

    return routes;
}
