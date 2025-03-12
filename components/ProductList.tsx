import { getProducts } from "@/lib/actions/action";
import { FeaturedProduct } from "./featured-product";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./product-card";

const ProductList = async () => {
  const products = await getProducts();

  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular items, carefully curated for exceptional quality
            and design.
          </p>
        </div>

        <div className="space-y-24">
          {products.map((product: ProductType, index: number) => (
            <FeaturedProduct
              key={product._id}
              product={product}
              index={index}
            />
          ))}
        </div>
        <div>
          <section className="py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">
                    Products
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    The latest additions to our collection.
                  </p>
                </div>
                <Button variant="link" asChild className="group">
                  <Link href="/products" className="flex items-center">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: ProductType) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
