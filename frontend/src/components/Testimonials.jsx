import { CheckCircle2, Quote } from "lucide-react";
import '../styles/testimonials.css';
import AdultHaircut from '../assets/Testimonials/Adult_haircut_avatar.webp';
import KidsHaircut from '../assets/Testimonials/Kids_haircut_avatar.webp';
import MenHaircut from '../assets/Testimonials/Men_haircut_avatar.webp';

// --- Usage -------------------------------------------------------------
// <TestimonialSection testimonials={data} />
// where data = [{
//   name: "Marcus Johnson",
//   location: "Sandy Springs",
//   quote: "Clip Culture truly defines the standard in barbering. Precision cuts, unmatched service, and a vibe that makes every visit an experience.",
//   rating: 5,
//   photoUrl: "/images/clients/marcus.jpg" // optional
// }]
// ----------------------------------------------------------------------

const DEFAULT_TESTIMONIALS = [
  {
    name: "Megan Rizzo",
    location: "Sandy Springs",
    quote:
      "Most amazing service ever received. The barber made my son feel calm and took his time. He played with him and got him used to the equipment. We have a friend and barber for life! I will never go anywhere else!",
    rating: 5,
    verified: true,
    photoUrl: KidsHaircut,
  },
  {
    name: "Toddie Fox",
    location: "Summerhill",
    quote:
      "I was hesitant to try a new barber, but Dave put me at ease the moment I walked in. Professional, welcoming, and precise—this was one of the best cuts I've ever had. Clip Culture truly defines the standard, and I've found my go-to barber.",
    rating: 5,
    verified: true,
    photoUrl: AdultHaircut,
  },
  {
    name: "Q Smith",
    location: "Sandy Springs",
    quote:
      "I came in as a walk-in after trying (and failing) to cut my own hair the night before. With a wedding to attend just hours later, Dave completely transformed my look—fixing my lineup and having me ready to show up sharp. The craftsmanship and care were next-level. I'll definitely be back.",
    rating: 5,
    verified: true,
    photoUrl: MenHaircut,
  },
];

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} className="star full">★</span>
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <span key="half" className="star half">★</span>
    );
  }

  // Empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className="star empty">★</span>
    );
  }

  return stars;
};

export default function Testimonials({
  title = "Client Testimonials",
  subtitle = "Trusted by the culture. Loved by the community!",
  testimonials = DEFAULT_TESTIMONIALS,
}) {
  return (
    <section className="testimonials relative py-14 md:py-20 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-3 text-base md:text-lg text-neutral-300">
            {subtitle}
          </p>
        </header>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

            {/* Google Reviews Section */}
            <div className="testimonials__reviews-section">
              <div className="testimonials__reviews-content">
                <p className="testimonials__reviews-text">
                  We have <span className="testimonials__reviews-highlight">100+ 5-star reviews</span> on
                </p>
                <div className="testimonials__google-logo">
                  <span className="testimonials__google-g">G</span>
                  <span className="testimonials__google-o1">o</span>
                  <span className="testimonials__google-o2">o</span>
                  <span className="testimonials__google-g2">g</span>
                  <span className="testimonials__google-l">l</span>
                  <span className="testimonials__google-e">e</span>
                </div>
              </div>
              <a 
                href="https://www.google.com/search?sca_esv=6dafe947a188a050&sxsrf=AE3TifMfQjPQ-S1svPmsQWDfRMC7O-XYcA:1758506946345&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E1Tv6AExoe0NFs0F3v29kcR2Tlh0MfU6JASboDu0L_oy1Y8XidDPPt3dmBMAqZvhN1KzlJ1Qn2oe6VXuDdJAPmLNDOGgWKkQAwCNcHTn7lR7UgMdng%3D%3D&q=Clip+Culture+Barbershop+Reviews&sa=X&ved=2ahUKEwiJz_zupOuPAxV438kDHWbQOaUQ0bkNegQILRAE&biw=1280&bih=574&dpr=1"
                target="_blank"
                rel="noopener noreferrer"
                className="testimonials__reviews-button"
              >
                See All Reviews
              </a>
            </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, location, quote, rating = 5, photoUrl, verified = true }) {
  return (
    <article className="group relative rounded-2xl overflow-hidden bg-neutral-900/80 border border-white/10 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.6)]">
      {/* glow border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

      {/* accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

      <div className="p-6 md:p-7">
        {/* Client Info Grid */}
        <div className="testimonials__client-grid mb-4">
          {/* Left Side - Image and Verified */}
          <div className="testimonials__left-section">
            <div className="relative h-12 w-12 rounded-full bg-neutral-800 ring-1 ring-white/10 overflow-hidden">
              {photoUrl ? (
                <img src={photoUrl} alt={`${name} headshot`} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full grid place-items-center text-xs text-neutral-400">
                  Photo
                </div>
              )}
              <span className="absolute inset-0 rounded-full ring-2 ring-emerald-400/40 group-hover:ring-teal-300/60 transition" />
            </div>
            {verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/30 mt-2">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified
              </span>
            )}
          </div>
          
          {/* Right Side - Name, Location, Rating */}
          <div className="testimonials__right-section">
            <h4 className="text-white font-semibold leading-tight mb-1">{name}</h4>
            <p className="text-neutral-400 text-sm mb-2">{location}</p>
            <div className="testimonials__rating-with-score" aria-label={`Rated ${rating} out of 5`}>
              {renderStars(rating)}
              <span className="testimonials__rating-score">({rating})</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Quote */}
        <blockquote className="relative">
          <Quote className="absolute -left-2 -top-2 h-6 w-6 text-teal-300/40" />
          <p className="pl-5 text-[15px] leading-7 text-neutral-200 italic">
            {`"${quote}"`}
          </p>
        </blockquote>
      </div>
    </article>
  );
}
