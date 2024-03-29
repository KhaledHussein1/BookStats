import TextList from '../textManagement/TextList';
import TextForm from '../textManagement/TextForm';
import { Button, Modal, Paper, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Home({ texts = [], closeModal, openEditModal, openCreateModal, isModalOpen, currentText, onUpdate }) {
    return (
      <>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '10px' }}>
        <Grid item xs={8}>
          <TextList texts={texts} updateText={openEditModal} updateCallback={onUpdate} />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button onClick={openCreateModal} variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} style={{ marginTop: '10px' }}>
            Create New TEXT
          </Button>
        </Grid>
      </Grid>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Paper className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              <Button variant="text" disableRipple>
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
  