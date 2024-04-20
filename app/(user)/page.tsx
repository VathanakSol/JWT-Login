"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchUserProfile } from "@/redux/features/userProfile/userProfileSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
	const { data: session } = useSession();
	console.log(session);
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUserProfile());
	}, []);

	// if user is not signed in
	if (!session) {
		return (
			<main className="w-full h-screen flex flex-col justify-center items-center font-extrabold bg-gray-400">
				<p className="text-2xl mb-8">Have Not Signed Yet</p>
				<button
					className="bg-orange-500 py-2 px-6 rounded-md text-white mb-2 hover:bg-orange-700 transition-all ease-in-out"
					onClick={() => signIn("google")}
				>
					Sign In With Google
				</button>
				<button
					className="bg-orange-500 border-none border py-2 px-6 rounded-md mt-2 text-gray-100 hover:text-white hover:bg-black transition-all ease-in-out"
					onClick={() => signIn("github")}
				>
					Sign In With Github
				</button>
			</main>
		);
	}

	return (
		<main className="w-full h-screen flex flex-col justify-center items-center">
			<div className="w-44 h-44 relative mb-4">
				<Image
					src={session.user?.image as string}
					fill
					alt=""
					className="object-cover rounded-full"
				/>
			</div>
			<p className="text-2xl mb-2">
				Welcome <span className="font-bold">{session.user?.name}</span>. Signed
				In As
			</p>
			<p className="font-bold mb-4">{session.user?.email}</p>
			<button
				className="bg-red-600 py-2 px-6 rounded-md"
				onClick={() => signOut()}
			>
				Sign out
			</button>
		</main>
	);
}
