import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import MainLayout from "../../layout/Main/MainLayout";
import ErrorPage from "../../ErrorPage/Error/ErrorPage";


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
        ]
    }
])

export default Router;