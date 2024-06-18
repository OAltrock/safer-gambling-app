import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>Work in progress</div>
      <div className="button-container">
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};
export default GamePage;
