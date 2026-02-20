import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_TESTIMONIALS = [
  {
    text: "An exceptional dining experience. The lahmacun was perfectly crisp and the service was impeccable. We will definitely be back.",
    name: "Ayşe Y.",
  },
  {
    text: "Authentic Gaziantep flavours right here in Istanbul. The atmosphere is warm and the food is outstanding. Highly recommend.",
    name: "Mehmet K.",
  },
  {
    text: "Best lahmacun we've had outside of Gaziantep. Fresh ingredients, generous portions, and a team that clearly cares about quality.",
    name: "Zeynep A.",
  },
  {
    text: "A hidden gem in Üsküdar. The pide and lahmacun are divine. Perfect for a late dinner—open until 2am!",
    name: "Can D.",
  },
];

export default function TestimonialCarousel({ testimonials = DEFAULT_TESTIMONIALS }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (i) => setIndex((prev) => (i + testimonials.length) % testimonials.length),
    [testimonials.length]
  );
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => goNext(), 5000);
    return () => clearInterval(t);
  }, [isPaused, index, goNext]);

  const current = testimonials[index];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0f] to-[#050508] py-16 px-4 sm:py-20 sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative flex min-h-[200px] items-center justify-center">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/40 transition-colors hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              <blockquote className="font-['Playfair_Display',_Georgia,_serif] text-lg italic leading-relaxed text-white/95 sm:text-xl sm:leading-relaxed">
                &ldquo;{current.text}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="h-px w-10 flex-shrink-0 bg-white/20" aria-hidden />
                <cite className="not-italic font-['Playfair_Display',_Georgia,_serif] text-sm font-medium tracking-wide text-[#D4AF37] sm:text-base">
                  {current.name}
                </cite>
                <span className="h-px w-10 flex-shrink-0 bg-white/20" aria-hidden />
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/40 transition-colors hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
        </div>

        <div
          className="mt-10 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Testimonial pagination"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-[width,background-color,box-shadow] duration-300 ease-out hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0f] ${
                i === index ? "bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" : "bg-white/20"
              }`}
              style={{ width: i === index ? "40px" : "6px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
