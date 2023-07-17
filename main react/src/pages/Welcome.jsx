import Nav from 'react-bootstrap/Nav';
import { NavigationBar } from '../components/NavigationBar';
import Button from 'react-bootstrap/Button';
import Features from '../content-welcome/features';
import Presentation from '../content-welcome/Presentation';
import { HowWorks } from '../content-welcome/HowWorks';
import Faq from '../content-welcome/FAQ';
import { Info } from '../content-welcome/Info';

export function Welcome() {
    return (
        <>
      <NavigationBar elements={
        <>
          <Nav.Link href="/about" className='fs-6 m-3 py-3'>About</Nav.Link>
          <Nav.Link href="/explore" className='fs-6 m-3 py-3'>Explore</Nav.Link>
          <div className="d-flex align-items-center divider-bar bg-dark m-3" />
          <Button variant="warning" className='btn-register m-3 px-4 py-3'>Register</Button>
          <Button href="/signin" variant="info" className='btn-signin m-3 me-5 px-4 py-3'>Sign in</Button>
        </>
      } />
      <div className="welcome-content d-flex flex-column mt-5 mx-2 pt-5 px-1">
        <Presentation />
        <Features />
        <HowWorks />
        <Faq />
        <Info />
      </div>
    </>
    );
}