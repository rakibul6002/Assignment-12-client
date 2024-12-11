import { Link } from "react-router-dom";
import ErrorImg from "../../assets/ErrorPhoto/Error.png";
export default function ErrorPage() {
  return (
    <div className="min-h-screen w-full bg-blue-200">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-10 shadow-md rounded-md flex flex-col items-center justify-center gap-3 ">
                    <img className="w-24" src={ErrorImg} alt="Error Image" />
                    
                    <h2 className="font-bold text-xl">This Page Is Not Found!</h2>
                    
                    <Link to={'/'} className="btn bg-blue-600 text-gray-100 hover:bg-blue-500 hover:text-black">Back To Home</Link>
                </div>
            </div>
    </div>
  )
}
