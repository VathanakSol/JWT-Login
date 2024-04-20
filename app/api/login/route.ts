import { serialize } from "cookie";
import { NextResponse } from "next/server";
export  async function POST(
    req: Request,
) {
    const body = await req.json();
    const { email, password } = body;

    console.log(email, password);

    console.log(process.env.DJANGO_API_URL);

    const response = await fetch(
        `${process.env.DJANGO_API_URL}/api/user/login/`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        }
    );

    console.log(response);

    if (!response.ok) {
        return NextResponse.json(
            {
                message: "Failed to login",
            },
            {
                status: response.status,
            }
        );
    }

    const data = await response.json();

    console.log(data);

    const serialized = serialize("refreshToken", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });
     return NextResponse.json({
        accessToken: data.access_token,
        user: data.user,
     }, {
        status: response.status,
        headers: {
            "Set-Cookie": serialized,
        },
    });
}
