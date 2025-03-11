import React from "react";

const Commitment = () => {
  return (
    <section className="py-24 px-4 sm:px-6 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Quality Materials</h3>
            <p className="text-primary-foreground/80">
              We source only the finest materials to ensure our products stand
              the test of time.
            </p>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Sustainable Practices</h3>
            <p className="text-primary-foreground/80">
              Every product is crafted with sustainability in mind, from
              materials to packaging.
            </p>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Thoughtful Design</h3>
            <p className="text-primary-foreground/80">
              We believe in design that serves a purpose, creating products that
              enhance your everyday life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commitment;
