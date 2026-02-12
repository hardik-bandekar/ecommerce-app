"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded shadow">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover mb-4 cursor-pointer"
        />
        <h2 className="font-semibold cursor-pointer">{product.title}</h2>
      </Link>

      <p className="text-gray-600">${product.price}</p>

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
        className="mt-3 bg-black text-white px-4 py-2 rounded"
      >
        Add To Cart
      </button>
    </div>
  );
}
