import Logo from '../assets/svgs/Logo.svg'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export function NavigationBar({elements}) {
    const navigate = useNavigate();
    return (
      <>
        <Navbar bg="light" data-bs-theme="light" fixed="top" className="welcome-bar shadow-sm p-1 d-flex">
            <Navbar.Brand onClick={() => navigate("/")} className='d-flex logo-href ps-3 ms-5 me-auto' >
                <img src={Logo} alt="logo" className='logo-main p-2 navbar-brand'/>
            </Navbar.Brand>
            <div className="welcome-bar-elements m-2 d-flex">
                <Nav className='d-flex'>
                    {elements}
                </Nav>
            </div> 
        </Navbar>
      </>
    );
}
NavigationBar.propTypes = {
    elements: PropTypes.node.isRequired,
};