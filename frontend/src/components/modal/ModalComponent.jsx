// src/components/modal/ModalComponent.jsx
import React from 'react';
import { Modal, Paper, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalComponent = ({ isOpen, onClose, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper style={{ position: 'absolute', width: 'auto', maxWidth: '80%', maxHeight: '90%', overflowY: 'auto', padding: '20px', boxSizing: 'border-box', outline: 'none' }}>
        <div className="modal-content">
          <Button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <CloseIcon />
          </Button>
          {children}
        </div>
      </Paper>
    </Modal>
  );
};

export default ModalComponent;
