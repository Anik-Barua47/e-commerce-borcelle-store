"use client";
import { Button } from "@/components/ui/button";
import useCart from "@/lib/hooks/useCart";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

interface FeaturedProductProps {
  product: ProductType;
  index: number;
  className?: string;
}

export function FeaturedProduct({
  product,
  index,
  className,
}: FeaturedProductProps) {
  const isOdd = index % 2 === 1;
  const elementRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { user } = useUser();

  const cart = useCart();

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();

      if (data && data.wishlist) {
        setSignedInUser(data);
        setIsLiked(data.wishlist.includes(product._id));
      }
      setIsLoading(false);
    } catch (err) {
      console.error("[users_GET]", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const addToWishlist = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId: product._id }),
        headers: { "Content-Type": "application/json" },
      });

      const updatedUser = await res.json();
      console.log("Updated User Data:", updatedUser); // Debugging log

      if (updatedUser?.wishlist) {
        setSignedInUser(updatedUser);
        const isItemInWishlist = updatedUser.wishlist.includes(product._id);
        setIsLiked(isItemInWishlist);

        // Show different toast messages based on state
        toast(
          isItemInWishlist ? "Added to wishlist" : "Removed from wishlist",
          {
            description: product?.title,
          }
        );
        mutate("/api/users/wishlist");
      }
    } catch (error) {
      console.error("[wishlist_POST]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center opacity-0",
        className
      )}
    >
      <div className={isOdd ? "md:order-2" : ""}>
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={product.media[0]}
            alt={product.title}
            className="w-full h-full object-cover hover-scale"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded">
          New Arrival
        </div>

        <h2 className="text-3xl font-semibold tracking-tight">
          {product.title}
        </h2>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-xl font-medium">${product.price.toFixed(2)}</p>

        <div className="flex flex-col xs:flex-row gap-3">
          <Button variant="outline" size="lg" onClick={addToWishlist}>
            <Heart
              className="mr-2 h-5 w-5"
              fill={`${isLiked ? "black" : "white"}`}
            />
            Wishlist
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href={`/products/${product._id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
