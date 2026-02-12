import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = searchParams.get("limit") || "10";
    const skip = searchParams.get("skip") || "0";
    const sortBy = searchParams.get("sortBy") || "";
    const order = searchParams.get("order") || "";
    const category = searchParams.get("category") || "";

    const base = process.env.DUMMY_JSON_BASE_URL;

    let url: string;

    if (category) {
      url = `${base}/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
      url = `${base}/products?limit=${limit}&skip=${skip}`;
    }

    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch products" },
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
