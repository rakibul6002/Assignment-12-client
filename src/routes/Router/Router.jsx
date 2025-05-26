import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import MainLayout from "../../layout/Main/MainLayout";
import ErrorPage from "../../ErrorPage/Error/ErrorPage";
import JoinUs from "../../pages/JoinUs/JoinUs";
import DashBoardLayout from "../../layout/DashBoardLayout";
import Dashbord from "../../pages/Dashboard/Dashbord";
import AdminProfile from "../../pages/Dashboard/adminProfile";
import ManageUsers from "../../pages/Dashboard/manageUser";
import AddMeal from "../../pages/Dashboard/addMeal";
import AllMeal from "../../pages/Dashboard/allMeal";
import AllReviews from "../../pages/Dashboard/allReviews";
import ServeMeal from "../../pages/Dashboard/serveMeal";
import UpcomingMeal from "../../pages/Dashboard/upcomingMeal";
import MyProfile from "../../pages/Dashboard/myProfile";
import RequestedMeal from "../../pages/Dashboard/requestedMeal";
import MyReviews from "../../pages/Dashboard/myReviews";
import PaymentHistory from "../../pages/Dashboard/paymentHistory";


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
    },
    {
        path: "dashboard",
        element: <DashBoardLayout></DashBoardLayout>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "dashboard",
                element: <Dashbord/>,  
            },
            {
                path: "adminProfile",
                element: <AdminProfile/>,  
            },
            {
                path: "manageUser",
                element: <ManageUsers/>,  
            },
            {
                path: "addMeal",
                element: <AddMeal/>,  
            },
            {
                path: "allMeal",
                element: <AllMeal/>,  
            },
            {
                path: "allReviews",
                element: <AllReviews/>,  
            },
            {
                path: "serveMeal",
                element: <ServeMeal/>,  
            },
            {
                path: "upcomingMeal",
                element: <UpcomingMeal/>,  
            },
            {
                path: "myProfile",
                element: <MyProfile/>,  
            },
            {
                path: "requestedMeal",
                element: <RequestedMeal/>,  
            },
            {
                path: "myReviews",
                element: <MyReviews/>,  
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory/>,  
            },
        ]
    }
])

export default Router;