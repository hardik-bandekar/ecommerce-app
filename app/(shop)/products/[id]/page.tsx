import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(`${process.env.DUMMY_JSON_BASE_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const product: Product = await res.json();

  return <ProductDetailClient product={product} />;
}
