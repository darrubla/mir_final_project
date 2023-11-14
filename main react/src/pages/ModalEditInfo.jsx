import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { css, cx } from '@emotion/css';
import PropTypes from 'prop-types';
import EditForm from '../components/EditForm';

export default function ModalEditInfo({userType, name, lastname, bio, age,handleClose, show, id, handleShowConfirm}) {
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
            {<EditForm
              userType={userType}
              name={name}
              lastname={lastname}
              bio={bio}
              age={age}
              id={id}
              handleClose={handleClose}
              handleShowConfirm={handleShowConfirm}
            />}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

ModalEditInfo.propTypes = {
  userType: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  handleShowConfirm: PropTypes.func.isRequired,
}
