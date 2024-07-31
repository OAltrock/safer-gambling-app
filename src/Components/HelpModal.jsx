import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Settings from '../Assets/Settings.png';
import Icon from  '../Assets/Icon.png';
import Troubleshooting from  '../Assets/troubleshooting.png';
import '../Styles/HelpPage.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (onSearch) {
      onSearch(searchTerm);
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

const topics = [
  { id: 1, name: 'Technical Support' },
  { id: 2, name: 'Navigation & Controls' },
  { id: 3, name: 'Game Troubleshooting' },
  // Add more topics as needed
];
const HelpModal = ({ showHelpPopup, setShowHelpPopup }) => {
  const handleClose = () => setShowHelpPopup(false);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [resultsFound, setResultsFound] = useState(true); // Initialize to true
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      // If search term is empty, show no topics
      setFilteredTopics([]);
    } else {
      const filteredTopics = topics.filter((topic) =>
        topic.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredTopics(filteredTopics);
      setResultsFound(filteredTopics.length > 0); // Set to true if any topics match
    }
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
            <label htmlFor="search-bar" className="search-label" style={{ scale: "65%", alignSelf: "center" }}>Search For A Topic: </label>
            <SearchBar onSearch={handleSearch} />
            <div className="linkContainerContainer">
                {resultsFound ? (
                filteredTopics.map((topic) => (
             <div className="linkContainer" key={topic.id}>
             {/* Display topic name */}
            <span>{topic.name}</span>
            </div>
            ))
            ) : (
           <p>No results found.</p>
            )}
          </div>
            <div className='linkContainerContainer' style={{ scale: "65%", alignSelf: "center" }}>
              <div className='linkContainer'>
                <img src={Settings} alt='Technical Support' style={{ scale: "65%", alignSelf: "center" }}/>
                <label htmlFor="technical-support" className="technical-label" style={{ scale: "65%", alignSelf: "center" }}>Technical Support</label>
              </div>
              <div className='linkContainer'>
                <img src={Icon} alt='Navigation & Controls' style={{ scale: "65%", alignSelf: "center" }} />
                <label htmlFor="navigation-controls" className="nagivation-label" style={{ scale: "65%", alignSelf: "center" }}>Navigation & Controls</label>
              </div>
              <div className='linkContainer'>
                <img src={Troubleshooting} alt='Troubleshooting' style={{ scale: "65%", alignSelf: "center" }}/>
                <label htmlFor="troubleshooting" className="troubleshooting-label" style={{ scale: "75%", alignSelf: "center" }}>Game Troubleshooting </label>
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
