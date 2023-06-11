import Layout from "../components/layout";
import Answer from "../pages/answer";
import Home from '../pages/home';
import Login from '../pages/login';
import Quiz from "../pages/quiz";
import Register from '../pages/register'
import Result from "../pages/result";
import Topic from "../pages/topic";

const routes = [
    {
        path: "/",
        element: <Layout/>,
        children : [
            {
                index: true,
                element: <Home/>
            },
            { 
                path: "login",
                element: <Login/>,
            },
            { 
                path: "register",
                element: <Register/>,
            },
            { 
                path: "topic",
                element: <Topic/>,
            },
            { 
                path: `quiz/:id`,
                element: <Quiz/>,
            },
            { 
                path: `result/:id`,
                element: <Result/>,
            },
            { 
                path: "answer",
                element: <Answer/>,
            },
            { 
                path: "*",
                element: <Home/>,
            },
        ]
    }
]
export default routes;