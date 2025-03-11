import { ProductCard } from "@/components/product-card";
import SingleProductDetails from "@/components/SingleProductDetails";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/action";
import { ChevronRight, Heart, Share2, ShoppingCart } from "lucide-react";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductDetails(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);
  return (
    <>
      <SingleProductDetails productDetails={productDetails} />
      <div className="product-wrapper py-16 mt-8 border-t border-border">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          {relatedProducts.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default ProductDetails;

{
  /* <section className="product-wrapper py-16 mt-8 border-t border-border">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section> */
}
