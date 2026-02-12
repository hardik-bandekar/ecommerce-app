import Link from "next/link";
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

interface Category {
  slug: string;
  name: string;
}

interface Props {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sortBy?: string;
    order?: string;
    q?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const category = params.category || "";
  const sortBy = params.sortBy || "";
  const order = params.order || "";
  const q = params.q || "";

  const limit = 10;
  const skip = (page - 1) * limit;

  let url: string;
  const base = process.env.DUMMY_JSON_BASE_URL;

  if (q) {
    url = `${base}/products/search?q=${q}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    url = `${base}/products/category/${category}?limit=${limit}&skip=${skip}`;
  } else {
    url = `${base}/products?limit=${limit}&skip=${skip}`;
  }

  if (sortBy && order) {
    url += `&sortBy=${sortBy}&order=${order}`;
  }

  const productsRes = await fetch(url, {
    cache: "no-store",
  });

  if (!productsRes.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await productsRes.json();
  const totalPages = Math.ceil(data.total / limit);

  const categoriesRes = await fetch(
    `${process.env.DUMMY_JSON_BASE_URL}/products/categories`,
    { cache: "no-store" },
  );

  if (!categoriesRes.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await categoriesRes.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <form action="/products" className="mb-4 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search products..."
          className="border px-3 py-2 rounded w-64"
        />

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* Filters */}
      <Filters categories={categories} />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-4 mt-8 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/products?page=${i + 1}&category=${category}&sortBy=${sortBy}&order=${order}&q=${q}`}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
