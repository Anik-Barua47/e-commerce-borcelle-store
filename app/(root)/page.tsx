import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Commitment from "@/components/Commitment";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Collections */}

      <div id="content" className="py-24 px-4 bg-secondary/30">
        <Collections />
      </div>

      <div>
        <ProductList />
      </div>

      {/* Our Commitment */}
      <Commitment />
    </div>
  );
}

export const dynamic = "force-dynamic";
