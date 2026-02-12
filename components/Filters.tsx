"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  slug: string;
  name: string;
}

interface Props {
  categories: Category[];
}

export default function Filters({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    params.set("page", "1"); // reset page
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (order: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", "title");
    params.set("order", order);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="border p-2"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => handleSortChange(e.target.value)}
        className="border p-2"
      >
        <option value="">Sort</option>
        <option value="asc">Title Asc</option>
        <option value="desc">Title Desc</option>
      </select>
    </div>
  );
}
