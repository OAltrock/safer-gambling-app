import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Settings from '../Assets/Settings.png';
import Icon from '../Assets/Icon.png';
import Troubleshooting from '../Assets/troubleshooting.png';

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
  const [filteredTopics, setFilteredTopics] = useState([
    { img: Settings, label: 'Technical Support', link: '/technical-support' },
    { img: Icon, label: 'Navigation & Controls', link: '/navigation-controls' },
    { img: Troubleshooting, label: 'Troubleshooting', link: '/troubleshooting' },
  ]);

  const handleClose = () => setShowHelpPopup(false);

  const handleSearch = (searchTerm) => {
    const topics = [
      { img: Settings, label: 'Technical Support', link: '/technical-support' },
      { img: Icon, label: 'Navigation & Controls', link: '/navigation-controls' },
      { img: Troubleshooting, label: 'Troubleshooting', link: '/troubleshooting' },
    ];

    const filtered = topics.filter(topic =>
      topic.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTopics(filtered);
  };

  return (
    <>
      <Modal
        show={showHelpPopup}
        onHide={handleClose}
        animation={false}
        size="lg" // Options are 'sm', 'lg', and 'xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body id="helpModal">
          <>
            <label htmlFor="search-bar" className="search-label" style={{ scale: "75%", alignSelf: "center" }} >Search For A Topic: </label>
            <SearchBar onSearch={handleSearch} />
            <div className='linkContainerContainer'>
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic, index) => (
                  <div className='linkContainer' key={index}>
                    <img src={topic.img} alt={topic.label} style={{ scale: "80%", alignSelf: "center" }} />
                    <a href={topic.link} className="topic-link" style={{ scale: "100%", alignSelf: "center" }}>{topic.label}</a>
                  </div>
                ))
              ) : (
                <p>No results found</p>
              )}
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
