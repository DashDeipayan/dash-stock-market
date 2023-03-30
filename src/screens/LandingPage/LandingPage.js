import React from "react";
import "./LandingPage.css";

const BASE_URL = process.env.BASE_URL;

const LandingPage = () => {
	const google = () => {
		window.open(`${BASE_URL}/auth/google`, "_self");
	};
	const github = () => {
		window.open(`${BASE_URL}/auth/github`, "_self");
	};

	return (
		<div className="login-image">
			<div className="rds-image"></div>
			<div className="flex gap-5 flex-col items-center justify-self-stretch">
				<div className="w-80 h-20 bg-black  rounded-sm flex items-center justify-center ">
					<button
						className="p-0 text-2xl text-center text-white"
						onClick={github}
					>
						<img
							alt="github logo"
							className="inline w-1/6 mr-4 ml-0"
							src="assets/images/github-mark-white.png"
						></img>
						Sign in with GitHub
					</button>
				</div>
				<div className="h-20 w-80 flex-1 flex-grow fill-current">
					<img
						onClick={google}
						alt="google logo"
						className="object-fill w-80 h-20"
						src="assets/google_signin_buttons/web/2x/btn_google_signin_light_normal_web@2x.png"
					/>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
