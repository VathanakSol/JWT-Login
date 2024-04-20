"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	increment,
	decrement,
	incrementByAmount,
} from "@/redux/features/counter/counterSlice";

export default function Enroll() {
	const count = useAppSelector((state) => state.counter.value);

	const dispatch = useAppDispatch();
	const [amount, setAmount] = useState(10);
	return (
		<main className="h-screen grid place-content-center">
			<h1 className="text-5xl text-center my-4">{count}</h1>
			<button
				onClick={() => dispatch(increment())}
				className="my-4 p-4 rounded-xl text-gray-100 bg-orange-500 text-2xl font-semibold"
			>
				Increase by 1
			</button>
			<button
				onClick={() => dispatch(decrement())}
				className="my-4 p-4 rounded-xl text-gray-100 bg-orange-500 text-2xl font-semibold"
			>
				Decrease by 1
			</button>
			<button
				onClick={() => dispatch(incrementByAmount(amount))}
				className="my-4 p-4 rounded-xl text-gray-100 bg-orange-500 text-2xl font-semibold"
			>
				Increase by {amount}
			</button>
		</main>
	);
}
