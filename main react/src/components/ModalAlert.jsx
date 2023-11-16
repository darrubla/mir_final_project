import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { reactSwitch } from '../utils/rswitch';

export function ModalAlert({ handleClose, show }) {
  const [accountType, setAccountType] = useState();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName={cx(
        css`
          /*height: 352px;*/
          border: none;
        `,
        'bg-transparent',
      )}
      dialogClassName={css`
        max-width: 600px;
      `}
    >
      <Modal.Body
        className={cx(
          css`
            padding: 20px 20px 69px 20px;
          `,
          'bg-nexus-altbase bg-opacity-85 rounded-4 text-white',
        )}
        data-bs-theme="dark"
      >
        <div className="d-flex flex-column justify-content-between h-100">
          <button
            type="button"
            className={cx(
              css`
                width: 1rem;
                box-sizing: border-box;
              `,
              'btn-close ms-0',
            )}
            aria-label="Close"
            data-bs-dismiss="modal"
            onClick={handleClose}
          />
          <div
            className={cx(
              css`
                margin-left: 60px;
                margin-right: 60px;
                gap: 29px;
              `,
              'd-flex flex-column justify-content-between this!',
            )}
          >
            <div
              className={css`
                color: white;
                font-size: 31px;
                font-style: normal;
                font-weight: 600;
              `}
            >
              {reactSwitch(accountType, {
                student: 'Enter your credentials',
                teacher: 'Enter your credentials',
                default: 'Select Your Account Type',
              })}
            </div>

            {reactSwitch(accountType, {
              student: <SignIn />,
              teacher: <SignIn />,
              default: (
                <>
                  <Button
                    className={cx(
                      css`
                        height: 58px;
                      `,
                      'fs-6',
                    )}
                    variant="outline-light"
                    size="lg"
                    onClick={() => setAccountType('teacher')}
                  >
                    Continue as teacher
                  </Button>
                  <Button
                    className={cx(
                      css`
                        height: 58px;
                      `,
                      'fs-6',
                    )}
                    variant="outline-light"
                    size="lg"
                    onClick={() => setAccountType('student')}
                  >
                    Continue as student
                  </Button>
                </>
              ),
            })}
            {/*<SignIn />*/}
            {/*<SignUp />*/}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

ModalAlert.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onLog: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types
function CustomInput({ children, type }) {
  return (
    <div
      className={css`
        padding: 12px 0;
      `}
    >
      <div
        className={cx(
          css`
            padding: 7px 8px;
            border-radius: 4px;
            border: 1px solid #d0d0d0;
          `,
          'd-flex flex-column',
        )}
      >
        <span
          className={css`
            font-size: 14px;
            color: #d0d0d0;
            font-weight: 400;
          `}
        >
          {children}
        </span>
        <input
          className={css`
            background: none;
            border: none;
            &:focus {
              outline: none;
            }
          `}
          type={type}
        ></input>
      </div>
    </div>
  );
}

function SignIn() {
  return (
    <div
      className={cx(
        css`
          min-height: 496px;
        `,
        'd-flex flex-column justify-content-between',
      )}
    >
      <div>
        <CustomInput type="text">Username</CustomInput>
        <CustomInput type="password">Password</CustomInput>
        <p
          className={css`
            color: #00e022;
            font-family: Outfit;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          `}
        >
          Forgot Password?
        </p>
      </div>
      <div className="d-flex flex-column">
        <Button
          variant="nexus-dark"
          className={cx(
            css`
              margin: 24px 0;
              padding: 14px 0;
              font-weight: 600;
            `,
            'rounded-pill',
          )}
        >
          Log in
        </Button>
        <p
          className={css`
            color: #fff;
            font-family: Outfit;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          `}
        >
          Don{"'"}t have and account?{' '}
          <span
            className={css`
              color: #00e022;
              font-family: Outfit;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            `}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
