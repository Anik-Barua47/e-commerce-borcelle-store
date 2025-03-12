"use client";

import Loader from "@/components/Loader";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getProductDetails } from "@/lib/actions/action";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (err) {
      console.log("[users_GET", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  //   console.log(signedInUser);

  const getWishlistProducts = async () => {
    setLoading(true);

    if (!signedInUser) return;

    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        const res = await getProductDetails(productId);
        return res;
      })
    );

    setWishlist(wishlistProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="mt-28 px-8 md:px-5 lg:px-0 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-5 w-5 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
      </div>
      {wishlist.length === 0 && (
        <div className="py-16 text-center">
          <Heart className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Items added to your wishlist will appear here
          </p>
          <Button asChild>
            <Link href="/">Discover Products</Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-10 w-[600px] my-10">
        {wishlist.map((product) => (
          <div className="relative" key={product._id}>
            <ProductCard product={product} />
            <div className="absolute top-5 right-7 bg-white rounded-full p-2">
              <Heart fill="black" className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Wishlist;
