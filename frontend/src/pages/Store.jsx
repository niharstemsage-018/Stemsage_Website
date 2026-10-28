import Footer from "../components/common/Footer";
import { products, ProductCard } from "../components/home/OurProducts";

import bannerBg from "../assets/services/Courses.png";
import eduKitBg from "../assets/Edu-kit.webp";

function Store() {
  return (
    <main className="w-full bg-white font-sans text-slate-800">
      {/* ─── Top Background Banner ─── */}
      <div className="relative h-[280px] sm:h-[360px] md:h-[420px] w-full overflow-hidden bg-slate-900">
        <img
          src={bannerBg}
          alt="STEMSAGE Store Banner"
          className="h-full w-full object-cover object-center opacity-85 blur-[1px]"
          onError={(e) => {
            e.currentTarget.src = eduKitBg;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* ─── Floating White Intro Box ─── */}
      <div className="relative z-10 mx-auto -mt-28 sm:-mt-36 md:-mt-48 max-w-4xl px-4 sm:px-6">
        <div className="bg-white border border-slate-200/90 shadow-xl px-6 py-10 sm:px-12 sm:py-14 md:px-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 mb-6">
            Our <span className="text-red-600 font-medium">Products</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 font-normal">
            Explore our range of innovative STEM kits and educational products, designed to inspire the next generation of makers and innovators.
          </p>
        </div>
      </div>

      {/* ─── Products Grid ─── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 px-5 sm:px-8">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Store;
