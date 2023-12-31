import UserContext from '../containers/UserContext';
import { useContext } from 'react';

export function StudentAccountInfo() {
    const { user } = useContext(UserContext);
    return (
        <div className="info-recent-teachers d-flex flex-column justify-content-center mx-1">
            <div className="d-flex flex-row section-header align-items-center">
                <div className="d-flex align-items-start divider-h bg-dark mx-2" />
                <h3 className="d-flex m-3 fw-lighter text-start"><strong>{`${user.name} ${user.lastname}`}</strong></h3>
                <div className="d-flex align-items-start divider-h bg-dark mx-2" />
            </div>
        </div>
    )
}
