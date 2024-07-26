import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Settings from '../Assets/Settings.png';
import Icon from  '../Assets/Icon.png';
import Troubleshooting from  '../Assets/troubleshooting.png';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <input
      type="text"
      placeholder="search..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};
const HelpModal = ({ showHelpPopup, setShowHelpPopup }) => {

  const handleClose = () => setShowHelpPopup(false);

  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log(`Search for: ${searchTerm}`);
  };

  return (
    <>
      <Modal
        show={showHelpPopup}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body id="helpModal">
          <>            
            <label htmlFor="search-bar" className="search-label">Search For A Topic: </label>
            <SearchBar onSearch={handleSearch} />
            <div className='linkContainerContainer'>
              <div className='linkContainer'>
                <img src={Settings} alt='Technical Support' style={{ scale: "65%", alignSelf: "center" }} />
                <label htmlFor="technical-support" className="technical-label">Technical Support</label>
              </div>
              <div className='linkContainer'>
                <img src={Icon} alt='Navigation & Controls' style={{ scale: "65%", alignSelf: "center" }} />
                {/* <a href="/Navigation & Controls">Navigation & Controls</a> */}
                <label htmlFor="navigation-controls" className="nagivation-label">Navigation & Controls</label>
              </div>
              <div className='linkContainer'>
                <img src={Troubleshooting} alt='Troubleshooting' style={{ scale: "71%", alignSelf: "center" }} />
                {/* <a href="/Troubleshooting">Troubleshooting</a> */}
                <label htmlFor="troubleshooting" className="troubleshooting-label">Troubleshooting </label>
              </div>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HelpModal;