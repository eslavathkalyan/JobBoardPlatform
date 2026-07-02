import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    alert("Logged Out Successfully!");

    navigate("/login");
  };

  return (
    <button
      onClick={logout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
}

export default LogoutButton;