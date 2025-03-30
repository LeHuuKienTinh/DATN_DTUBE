import NavBarUserHome from "./NavBarUserHome/NavBarUserHome.js";
import FooterHomePage from "../HomePage/FooterHomePage/FooterHomePage.js"
import MainContent from "./MainContent/MainContent";
import './UserHome'
import { Outlet } from "react-router-dom";
const UserHome = () => {


    return (
        <>
            <div className="navbar-userhome">
                <NavBarUserHome />
            </div>
            <div className="main-content" style={{ height: '100%', backgroundColor: 'black', marginTop: '72px' }}>
                <Outlet>
                    
                </Outlet>
            </div>
            <div className="footer-userhome">
                <FooterHomePage />
            </div>
        </>
    )
}

export default UserHome;