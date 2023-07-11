import Nav from 'react-bootstrap/Nav';
import { NavigationBar } from '../components/NavigationBar';
import Button from 'react-bootstrap/Button';
import { FormUsername } from '../components/FormUsername';
import { FormPassword } from '../components/FormPassword';
import { Identify } from '../components/Identify';
//import { useState } from 'react';

export function Signin() {
    return (
        <>
            <NavigationBar elements={
                <>
                    <Nav.Link href="/about" className='fs-6 m-3 py-3'>About</Nav.Link>
                    <Nav.Link href="/explore" className='fs-6 m-3 py-3'>Explore</Nav.Link>
                    <div className="d-flex align-items-center divider-bar bg-dark m-3" />
                    <Button href="/signup" variant="warning" className='btn-register m-3 px-4 py-3'>Register</Button>
                    <Button href="/signin" variant="info" className='btn-signin m-3 me-5 px-4 py-3'>Sign in</Button>
                </>
            }/>
            <Identify 
                formTitle="LOG IN"
                elements={
                    <>
                        <FormUsername 
                            fieldName="EMAIL/USERNAME"
                        />
                        <FormPassword 
                            fieldName="PASSWORD"
                        />
                        <Button variant="warning" className='d-flex btn-register m-3 px-4 py-3 justify-content-center'>SIGN IN</Button>
                        <Button variant="info" className='d-flex btn-signin m-3 px-0 py-3 justify-content-evenly'>
                            <div className='d-flex'>
                                <i className="bi bi-google" />
                            </div>
                            <div className='d-flex'>
                                CONTINUE WITH GOOGLE
                            </div>
                            
                            
                        </Button>
                    </>
                }
            />
        </>
    );
}