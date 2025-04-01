import { useNavigate } from 'react-router-dom';
import { useEffect } from "react"
import verifyToken from "../controllers/verifyToken.js"

const ProtectedRoute = ({children}) => {
    // const navigate = useNavigate()
    // const token = localStorage.getItem('token');

    // console.log("Entered protected route")
    // // If token is not valid, redirect to login page
    // if (!token || !verifyToken(token)) {
    //     console.log("Token not valid")
    //     navigate("/login")
    //     return null
    // }
    // console.log("Token valid")
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token || !verifyToken(token)) {
            console.log("Token not valid")
            navigate('/login');
        }
    }, [navigate]);

    return children
};

export default ProtectedRoute;
