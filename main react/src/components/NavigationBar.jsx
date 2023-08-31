import Logo from '../assets/svgs/Logo.svg'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export function NavigationBar({elements}) {
    const navigate = useNavigate();
    return (
      <>
        <Navbar bg="nexus-base" data-bs-theme="nexus-base" fixed="top" className="welcome-bar d-flex p-0 px-page-v pt-page-h">
            <Container fluid className='p-0'>
                <Navbar.Brand onClick={() => navigate("/")} className='d-flex' >
                    <Nav.Link>
                        <img src={Logo} alt="logo" className='logo-main navbar-brand'/>
                    </Nav.Link>
                </Navbar.Brand>
                <Nav className='d-flex column-gap-gut'>
                    {elements}
                </Nav>
            </Container>
        </Navbar>
      </>
    );
}
NavigationBar.propTypes = {
    elements: PropTypes.node.isRequired,
};