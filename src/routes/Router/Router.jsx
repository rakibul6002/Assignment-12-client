import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import MainLayout from "../../layout/Main/MainLayout";
import ErrorPage from "../../ErrorPage/Error/ErrorPage";
import JoinUs from "../../pages/JoinUs/JoinUs";


const Router = createBrowserRouter([
    {
        path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage/>,
      children:[
            {
            path: "/",
            element: <Home></Home>,
            },
            {
            path: "/joinus",
            element: <JoinUs/>,
            },
        ]
    }
])

export default Router;