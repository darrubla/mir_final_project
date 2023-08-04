import { NavigationBar } from '../components/NavigationBar';

export function NotFound() {

        return (
            <>
                <NavigationBar elements={<></>} />
                <div className="info-not-found d-flex flex-column justify-content-center mx-1">
                    <div className="d-flex align-items-center">
                        <h3 className="d-flex m-3 fw-lighter text-start"><strong>Not Found :(</strong></h3>
                    </div>
                </div>
            </>
                
        )
}