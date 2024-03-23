import TextList from '../textManagement/TextList';
import TextForm from '../textManagement/TextForm';

function Home({ texts = [], closeModal, openEditModal, openCreateModal, isModalOpen, currentText, onUpdate }) {
    return (
      <>
        <TextList texts={texts} updateText={openEditModal} updateCallback={onUpdate} />
        <button onClick={openCreateModal}>Create New TEXT</button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <TextForm existingText={currentText} updateCallback={onUpdate} />
            </div>
          </div>
        )}
      </>
    );
  }

  export default Home
  