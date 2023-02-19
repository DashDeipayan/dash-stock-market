import React from "react";
import apple from "./apple.png";

const Cards = () => {
	return (
		<div class="card hover:shadow-lg">
			<img
				src={apple}
				alt="stew"
				class="w-1/4 h-1/4 m-auto sm:h-48 object-contain"
			/>
			<div class="px-4 py-6 w-full">
				<span class="block font-bold text-2xl text-center">Apple Inc.</span>
				<span class="block text-gray-500 text-xl text-center">Price: $100</span>
			</div>
			<div class="time-badge">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 inline-block mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
				<span class="">Quantity: 100000</span>
			</div>
		</div>
	);
};

export default Cards;
