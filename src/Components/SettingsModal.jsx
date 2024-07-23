import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import GermanFlag from '../Assets/Germany-Flag-icon.png';
import UKFlag from '../Assets/United-Kingdom-Flag-1-icon.png';
import '../Styles/Modals.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../slices/languageSlice';

const SettingsModal = ({ showSettingsPopup, setShowSettingsPopup }) => {

  const handleClose = () => setShowSettingsPopup(false);
  //const handleShow = () => setShow(true);
  let current = useSelector(state => state.languages.current);
  let languages = {
    german: GermanFlag,
    english: UKFlag
  }
  let dispatch = useDispatch();

  return (
    <>
      <Modal
        show={showSettingsPopup}
        onHide={handleClose}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Language:
            <Dropdown className="d-inline mx-2" autoClose="inside">
              <Dropdown.Toggle id="dropdown-autoclose-inside">
                {current} <img src={languages[current]} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(languages).map(language => {
                  return (
                    <Dropdown.Item onClick={() => dispatch(setLanguage(language))}>{language} <img src={languages[language]} /></Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </p>
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

export default SettingsModal;
