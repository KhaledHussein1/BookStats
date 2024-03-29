import TextList from '../textManagement/TextList';
import TextForm from '../textManagement/TextForm';
import { Button, Modal, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Home({ texts = [], closeModal, openEditModal, openCreateModal, isModalOpen, currentText, onUpdate }) {
    return (
      <>
      <TextList texts={texts} updateText={openEditModal} updateCallback={onUpdate} />
        <div style={{ marginLeft: '20px', marginTop: '10px' }}> 
          <Button onClick={openCreateModal} variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
            Create New TEXT
          </Button>
        </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Paper className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="text" disableRipple>
              <CloseIcon fontSize="large" />
            </Button>
            </span>
            <TextForm existingText={currentText} updateCallback={onUpdate} />
          </div>
        </Paper>
      </Modal>
    </>
    );
  }

  export default Home
  