import logo from "../Assets/fdm_logo.png";
import "../Styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" alt=" logo" src={logo} width={150} height={75} />
    </div>
  );
};

export default Header;