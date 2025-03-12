import { FeaturedProduct } from "@/components/featured-product";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/actions/action";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Products = async () => {
  const products = await getProducts();
  return (
    <div className="my-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="text-sm text-muted-foreground">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-foreground transition-colors"
              >
                Products
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-10 max-w-7xl mx-auto">
        {products.map((product: ProductType, index: number) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
