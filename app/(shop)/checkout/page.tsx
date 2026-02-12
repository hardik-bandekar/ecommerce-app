"use client";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import type { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleOrder = () => {
    if (!name || !email || !address) {
      alert("Please fill all fields");
      return;
    }

    dispatch(clearCart());
    localStorage.removeItem("cart");

    router.push("/success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div>
          <h2 className="font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 font-bold text-lg">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="font-semibold mb-4">Shipping Details</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              placeholder="Address"
              className="w-full border p-2 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              onClick={handleOrder}
              className="w-full bg-black text-white py-3 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
