import { Product } from "@/types/product";
import { useState } from "react";
import { useApi } from "../hooks/useApi";

export const useProductViewModel = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const { data, loading, error, refetch } = useApi({
    url: "/c53fb45e-5085-487a-afac-0295f62fb86e",
    method: "GET",
  });

  const products: Product[] = data ?? [];

  const search = (query: string) => {
    setSearchQuery(query);
    const lower = query.toLowerCase().trim();

    if (lower === "") {
      setFiltered([]);
      return;
    }

    const results = products.filter((p) =>
      p.name.toLowerCase().includes(lower)
    );
    setFiltered(results);
  };

  const hasSearch = searchQuery.trim().length > 0;

  return {
    products: hasSearch ? filtered : products,
    loading,
    error,
    refetch,
    search,
  };
};
