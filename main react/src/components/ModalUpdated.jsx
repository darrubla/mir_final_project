import { Button, Modal } from 'react-bootstrap';
import { css, cx } from '@emotion/css';
import PropTypes from 'prop-types';

export default function ModalUpdated({show, handleClose}) {

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName={cx(css`/*height: 352px;*/border: none;`,'bg-transparent',)}
      dialogClassName={css`max-width: 600px;`}
    >
      <Modal.Body
        className={cx(css`padding: 20px 20px 69px 20px;`,'bg-nexus-altbase bg-opacity-85 rounded-4 text-white',)}
        style={{ paddingBottom: '26px' }}
        data-bs-theme="dark"
      >
        <div className="d-flex flex-column justify-content-between h-100">
          <button
            type="button"
            className={cx(css`width: 1rem;box-sizing: border-box;`,'btn-close ms-0',)}
            aria-label="Close"
            data-bs-dismiss="modal"
            onClick={handleClose}
          />
          <div className={cx(css`margin-left: 60px; margin-right: 60px; gap: 29px;`,'d-flex flex-column justify-content-between',)}>
            {`Your profile was updated!`}
          </div>
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
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

ModalUpdated.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}
