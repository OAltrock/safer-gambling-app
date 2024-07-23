import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import '../Styles/HelpPage.css';
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
        placeholder="Text search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    );
  };
  function Help() {
    const handleSearch = (searchTerm) => {
      // Implement your search logic here
      console.log(`Search for: ${searchTerm}`);
    };
  
    return (
      <div id='helpContainer'>
        <div className="header"> <h1>Help</h1> </div> 
        <label htmlFor="search-bar" className="search-label">Search For A Topic: </label>
         <SearchBar onSearch={handleSearch} />
        <div className='linkContainerContainer'>
                <div className='linkContainer'>
                    <img src={Settings} alt='Technical Support' style={{scale: "65%", alignSelf: "center"}}/>
                    <label htmlFor="technical-support" className="technical-label">Technical Support</label>
                </div>
                <div className='linkContainer'>
                    <img src={Icon} alt='Navigation & Controls' style={{scale: "65%", alignSelf: "center"}}/>
                    <a href="/TechnicalSupport">Navigation & Controls</a>
                </div>
                <div className='linkContainer'>
                <img src={Troubleshooting} alt='Troubleshooting' style={{scale: "71%", alignSelf: "center"}}/>
                    <a href="https://gamblersanonymous.org.uk/">Troubleshooting</a>
                </div>                
            </div>
      </div>
    );
  }
  

export default Help;
