import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookieStore = cookies();
	const credentail = cookieStore.get("refreshToken");

    console.log("refreshToken", credentail);

	if (!credentail) {
		return NextResponse.json(
			{
				message: "Unauthorized",
			},
			{
				status: 401,
			}
		);
	}

    const refreshToken = credentail.value;

	const response = await fetch(
		`${process.env.DJANGO_API_URL}/api/token/refresh/`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refresh: refreshToken }),
		}
	);

	if (!response.ok) {
		return NextResponse.json(
			{
				message: "Failed to refresh access token",
			},
			{
				status: response.status,
			}
		);
	}

	const data = await response.json();
    console.log(data);

	const serialized = serialize("refreshToken", data.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });

    return NextResponse.json(
        {
            accessToken: data.access,
        },
        {
            headers: {
                "Set-Cookie": serialized,
            },
        }
    );
}
