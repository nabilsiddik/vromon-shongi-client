import FadeIn from "@/animations/Fade/FadeIn";
import SlideIn from "@/animations/Slide/SlideUp";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    search: "Paris",
    tag: "Romantic & Cultural",
    image: "/images/home/top-destination/paris.jpg",
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    search: "Bali",
    tag: "Tropical Paradise",
    image: "/images/home/top-destination/indonesia.jpg",
  },
  {
    id: 3,
    name: "New York, USA",
    search: "New York",
    tag: "Urban Explorer",
    image: "/images/home/top-destination/new-york.jpg",
  },
  {
    id: 4,
    name: "Tokyo, Japan",
    search: "Tokyo",
    tag: "Tradition & Future",
    image: "/images/home/top-destination/tokyo-japan.jpg",
  },
];

export default function TopDestinations() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <SlideIn>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            ✈️ Top Travel Destinations
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Discover popular destinations where travelers are actively organizing trips and looking for buddies.
          </p>
        </div>
      </SlideIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {destinations.map((item) => (
          <FadeIn key={item.id}>
            <Link href={`/trips?searchTerm=${encodeURIComponent(item.search)}`} className="block group">
              <Card
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
                className="relative overflow-hidden rounded-2xl border-none shadow-md group-hover:shadow-2xl h-[320px] group-hover:scale-[1.03] transition-all ease-out duration-300 cursor-pointer"
              >
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:from-black/90" />

                <CardContent className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-white font-bold text-lg">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/80 group-hover:text-white mt-1.5 transition-colors">
                      <span>Explore active trips</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
