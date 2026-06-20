import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ label = "Back", to = -1, className = "" }) => {
  const navigate = useNavigate();

  return (
    <div className={`mx-auto  ${className}`}>
      <button
        onClick={() => navigate(to)}
        className="
  group inline-flex items-center gap-2
  rounded-full
  bg-gradient-to-r from-coffee to-sepia
  px-5 py-2.5 text-sm font-semibold text-tan
  shadow-md transition-all duration-200
  hover:shadow-lg hover:brightness-110
  active:scale-95
"
      >
        <FaArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default BackButton;


