"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const dispatch = useDispatch();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/products" className="text-blue-500">
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full rounded"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-gray-600 mt-4">{product.description}</p>

          <p className="text-2xl font-semibold mt-6">${product.price}</p>

          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  thumbnail: product.thumbnail,
                  quantity: 1,
                }),
              )
            }
            className="mt-6 bg-black text-white px-6 py-3 rounded"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
