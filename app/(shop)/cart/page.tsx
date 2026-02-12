"use client";

export const dynamic = "force-dynamic";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import Link from "next/link";

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export default function CartPage() {
  const dispatch = useDispatch();

  // ✅ Properly typed selector
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="mt-4 text-gray-600">Your cart is empty 🛒</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 border p-4 rounded"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-24 h-24 object-cover"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p>${item.price}</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right space-y-4">
        <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>

        <Link
          href="/checkout"
          className="inline-block bg-black text-white px-6 py-3 rounded"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
