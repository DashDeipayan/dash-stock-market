import { Link, useLocation } from "react-router-dom";
import "./profile.css";

const Profile = ({ setShowProfileOptions }) => {
	const location = useLocation().pathname.split("/")[1];
	console.log(location);
	const closeOptions = () => {
		setShowProfileOptions(false);
	};
	return (
		<>
			<div className="up-arrow"></div>
			<div className="bg-gray-100 relative shadow-md w-48 h-16 flex justify-center items-center rounded-md">
				<div
					className="p-3 w-5/6 text-xl text-center text-blue-900 font-semibold hover:bg-gray-200"
					onClick={closeOptions}
				>
					<Link to={location === "sellstocks" ? "/buystocks" : "/sellstocks"}>
						{location === "sellstocks" ? "Stocks" : "Your Stocks"}
					</Link>
				</div>
			</div>
		</>
	);
};

export default Profile;
