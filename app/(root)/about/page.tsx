import { Building } from "lucide-react";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto max-w-7xl pt-32 px-4 md:px-6 flex-grow">
        <div className="flex items-center gap-3 mb-8">
          <Building className="h-5 w-5 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              NORDIC began with a simple idea: to create timeless, minimalist
              designs that bring beauty and functionality to everyday life.
              Founded in 2018, our brand has grown from a small studio in
              Stockholm to an international presence.
            </p>
            <p className="text-muted-foreground mb-4">
              We believe that good design should be accessible to everyone. Our
              products combine Scandinavian design principles with sustainable
              materials and ethical manufacturing processes.
            </p>
            <p className="text-muted-foreground">
              Each piece in our collection is thoughtfully designed and
              rigorously tested to ensure it meets our high standards for
              quality and durability.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden w-[600px] h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Our workspace"
              className="object-cover"
              width={600}
              height={400}
            />
          </div>
        </div>

        <div className="py-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-medium mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to reducing our environmental impact
                through responsible sourcing, minimal packaging, and durable
                products designed to last.
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-medium mb-3">Craftsmanship</h3>
              <p className="text-muted-foreground">
                We partner with skilled artisans who take pride in their work,
                ensuring each product is made with care and attention to detail.
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-medium mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in being honest about our products and processes,
                sharing the journey from design concept to finished piece.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
