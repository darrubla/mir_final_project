import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IconBar } from './IconBar';

export function NavigationTab({title, iconClassName, navi}) {
    const navigate = useNavigate();
    return (
        <>
            <Nav.Link onClick={() => {
                console.log(title);
                title!==undefined?
                    navigate(`/${title.toLowerCase()}`)
                    : navigate(`/${navi.toLowerCase()}`)
                }
                }   
                className='fs-5 m-3 py-3'
            >
                <IconBar className={`${title!==undefined? "me-2 ": ""}${iconClassName!==undefined? iconClassName: ""}`} />

                {title}
            </Nav.Link>
        </>
    )
}
NavigationTab.propTypes = {
    title: PropTypes.string,
    iconClassName: PropTypes.string,
    navi: PropTypes.string,
};