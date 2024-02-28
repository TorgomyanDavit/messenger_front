import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./loading.scss"; 

const Loading = () => {
  return (
    <div className="loading">
      <AiOutlineLoading3Quarters className="loading-icon" />
    </div>
  );
};

export default Loading;
