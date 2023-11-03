import { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { css, cx } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../containers/AuthContext';

export function AuthModal({ children }) {
  /*const [accountType, setAccountType] = useState();*/
  const { accountType, setAccountType } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Modal
      show={true}
      onHide={() => {}}
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
        style={{ paddingBottom: accountType ? '26px' : '' }}
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
            onClick={() => navigate('/')}
          />
          <div
            className={cx(
              css`
                margin-left: 60px;
                margin-right: 60px;
                gap: 29px;
              `,
              'd-flex flex-column justify-content-between',
            )}
          >
            {accountType ? (
              children
            ) : (
              <>
                <div
                  className={css`
                    color: white;
                    font-size: 31px;
                    font-style: normal;
                    font-weight: 600;
                  `}
                >
                  Select Your Account Type
                </div>

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
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
