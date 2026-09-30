
import image from '../../../public/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'; 

export const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home-container">
            <img src={image} alt="logo" className="logo-image" />

            <div className="button-container">
                <Link className="custom-button" onClick={() => navigate('/login')}>Login</Link>
                <Link className="custom-button" onClick={() => navigate('/signup')}>Sign Up</Link>
            </div>
        </div>
    )
}
