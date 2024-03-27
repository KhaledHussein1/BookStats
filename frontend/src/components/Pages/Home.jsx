import TextList from '../textManagement/TextList';
import TextForm from '../textManagement/TextForm';
import { Button, Modal, Paper } from "@mui/material";

function Home({ texts = [], closeModal, openEditModal, openCreateModal, isModalOpen, currentText, onUpdate }) {
    return (
      <>
      <TextList texts={texts} updateText={openEditModal} updateCallback={onUpdate} />
      <Button onClick={openCreateModal} variant="contained" color="primary">Create New TEXT</Button>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Paper className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              <Button>X</Button>
            </span>
            <TextForm existingText={currentText} updateCallback={onUpdate} />
          </div>
        </Paper>
      </Modal>
    </>
    );
  }

  export default Home
  