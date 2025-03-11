"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: ProductType;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-out",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/30 rounded-lg">
        {product.media?.length > 1 ? (
          <div>
            <Image
              src={product?.media[0]}
              alt={product.title}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500 ease-in-out",
                isHovered ? "opacity-0" : "opacity-100"
              )}
              fill
            />
            <Image
              src={product.media[1]}
              alt={`${product.title} - alternate view`}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              fill
            />
          </div>
        ) : (
          <Image
            src={product?.media?.[0] ?? "/placeholder-image.jpg"}
            alt={product?.title ?? "Product Image"}
            className="w-full h-full object-cover hover-scale"
            fill
          />
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-medium line-clamp-1">{product.title}</h3>
        <p className="text-muted-foreground text-sm">
          ${product.price?.toFixed(2)}
        </p>
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-3 transform transition-transform duration-300",
          isHovered ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex flex-col xs:flex-row gap-3">
          {/* <Button className="w-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button> */}
          <Button className="w-full" variant="outline" size="lg" asChild>
            <Link href={`/products/${product._id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
