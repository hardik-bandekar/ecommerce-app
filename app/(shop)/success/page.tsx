import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Order Placed Successfully!
      </h1>

      <p className="mt-4 text-gray-600">Thank you for your purchase.</p>

      <Link
        href="/products"
        className="mt-6 inline-block bg-black text-white px-6 py-2 rounded"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
