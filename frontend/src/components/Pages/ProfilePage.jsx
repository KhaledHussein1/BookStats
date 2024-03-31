// src/components/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import TextList from '../textManagement/TextList';
import TextForm from '../textManagement/TextForm';
import ModalComponent from '../modal/ModalComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fetchTexts } from '../../api/textService';

const ProfilePage = () => {
  const username = localStorage.getItem('username');
  const [texts, setTexts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState({}); // Initially empty, used for creating or editing texts

  useEffect(() => {
    loadTexts();
  }, []);

  const loadTexts = async () => {
    const fetchedTexts = await fetchTexts(); // Adjust fetchTexts for auth if needed
    setTexts(fetchedTexts);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentText({});
  };

  const openCreateModal = () => {
    setIsModalOpen(true);
    setCurrentText({}); // Reset currentText for creating a new entry
  };

  const openEditModal = (text) => {
    setCurrentText(text); // Set currentText for editing
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    loadTexts(); // Reload texts after update
  };

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      <Typography>Welcome, {username}!</Typography>
      <TextList texts={texts} updateText={openEditModal} updateCallback={onUpdate} />
      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        <TextForm existingText={currentText} updateCallback={onUpdate} />
      </ModalComponent>
      <Grid container spacing={2} justifyContent="center" >
        <Grid item>
          <Button onClick={openCreateModal} variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}  style={{ marginTop: '10px' }}>
            Create New TEXT
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
