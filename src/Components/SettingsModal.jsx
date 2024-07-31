import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import GermanFlag from '../Assets/Germany-Flag-icon.png';
import UKFlag from '../Assets/United-Kingdom-Flag-1-icon.png';
import FranceFlag from '../Assets/France-Flag-icon.png';
import '../Styles/Modals.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSize } from '../slices/fontSlice';
import { setLanguage } from '../slices/languageSlice';

const SettingsModal = ({ showSettingsPopup, setShowSettingsPopup }) => {

  let fontSize = useSelector(state => state.setFontSize); 
  const handleClose = () => setShowSettingsPopup(false);
  //const handleShow = () => setShow(true);
  let current = useSelector(state => state.languages.current);  
  let languages = {
    Deutsch: GermanFlag,
    English: UKFlag,
    Francais: FranceFlag
  }
  let dispatch = useDispatch();

  const handleChange = (e) => {    
    document.documentElement.style.setProperty('--fdm-normal-font-size', e.target.value+'rem'); 
    document.documentElement.style.setProperty('--fdm-subHeader-font-size', new Intl.NumberFormat("en-GB", { maximumSignificantDigits: 3}).format(e.target.value*1.5)+'rem'); 
    document.documentElement.style.setProperty('--fdm-headings-font-size', e.target.value*2+'rem');
    dispatch(setSize({
      normalSize: e.target.value+'rem',
      subHeaderSize: new Intl.NumberFormat("en-GB", { maximumSignificantDigits: 3}).format(e.target.value*1.5)+'rem',
      headerSize: e.target.value*2+'rem'
    }));
  }

  /* useEffect(()=> {
    
    
  }, [tempFontSize]); */

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
          <Form.Label>Font size: {fontSize.normalSize.split('rem')[0]}</Form.Label>
          <Form.Range value={fontSize.normalSize.split('rem')[0]} min={0.5} max={1.5} step={0.1} onChange={handleChange} />
          <div>
            Language:
            <Dropdown className="d-inline mx-2" autoClose="inside">
              <Dropdown.Toggle id="dropdown-autoclose-inside">
                {current} <img src={languages[current]} alt={current} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(languages).map(language => {
                  return (
                    <Dropdown.Item key={language} onClick={() => dispatch(setLanguage(language))}>{language} <img src={languages[language]} alt={language} /></Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
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
