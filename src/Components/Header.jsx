import logo from "../Assets/fdm_logo.png";
import { useNavigate } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img className="logo" alt=" logo" onClick={() => navigate("/")} src={logo} width={150} height={75} />
    </div>
  );
};

export default Header;