import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { css, cx } from '@emotion/css';

export function ModalAlert({ handleClose, show, onLog }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName={cx(
        css`
          height: 352px;
          border: none;
        `,
        'bg-transparent'
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
          'bg-nexus-altbase bg-opacity-85 rounded-4'
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
              'btn-close ms-0'
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
              'd-flex flex-column justify-content-between this!'
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
              Select Your Account Type
            </div>
            <Button
              className={cx(
                css`
                  height: 58px;
                `,
                'fs-6'
              )}
              variant="outline-light"
              size="lg"
              onClick={() => onLog('teacher')}
            >
              Continue as teacher
            </Button>
            <Button
              className={cx(
                css`
                  height: 58px;
                `,
                'fs-6'
              )}
              variant="outline-light"
              size="lg"
              onClick={() => onLog('student')}
            >
              Continue as student
            </Button>
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
