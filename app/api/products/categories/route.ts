import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.DUMMY_JSON_BASE_URL}/products/categories`,
      { cache: "no-store" },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch categories" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
