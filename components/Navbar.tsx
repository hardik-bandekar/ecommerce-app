"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    dispatch(clearUser());

    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };
  // const handleLogout = () => {
  //   window.location.href = "/api/auth/logout";
  // };

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b">
      <Link href="/products" className="font-bold text-lg">
        🛍 Ecommerce
      </Link>

      <div className="flex gap-6 items-center">
        <Link href="/products">Products</Link>

        <Link href="/cart" className="relative">
          Cart
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>

        {/* {user && <span className="text-sm">Hello, {user.username}</span>} */}
        {user ? (
          <span>Hello, {user.username}</span>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
