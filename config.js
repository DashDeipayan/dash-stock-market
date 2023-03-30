import dotenv from "dotenv";

dotenv.config();

const { BASE_URL } = process.env;

module.exports = {
	BaseUrl: BASE_URL,
};
