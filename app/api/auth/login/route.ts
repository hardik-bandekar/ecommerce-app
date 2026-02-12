import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const response = await fetch(
      `${process.env.DUMMY_JSON_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: 401 },
      );
    }

    // ✅ FIX: await cookies()
    const cookieStore = await cookies();

    cookieStore.set("token", data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
      },
    });
  } catch (error) {
    console.error("Login API Error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
