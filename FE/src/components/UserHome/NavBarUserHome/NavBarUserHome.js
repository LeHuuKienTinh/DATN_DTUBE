import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSearch, FaBell } from "react-icons/fa";
import "./NavBarUserHome.scss";
import { useNavigate } from "react-router-dom";

const NavBarUserHome = () => {

    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" className="userhome-navbar">
                <Container>
                    <Navbar.Brand href="/">
                        DTube
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/")}>Trang chủ</Nav.Link>
                        <Nav.Link onClick={() => navigate("category/phim-bo")}>Phim bộ</Nav.Link>
                        <Nav.Link onClick={() => navigate("category/phim-le")}>Phim lẻ</Nav.Link>
                        <Nav.Link onClick={() => navigate("category/phim-chieu-rap")}>Phim chiếu rạp</Nav.Link>
                    </Nav>
                    <div className="nav-icons">
                        <FaSearch className="icon" />
                        <FaBell className="icon" />
                        <div className="profile-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" />
                        </div>
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBarUserHome;
