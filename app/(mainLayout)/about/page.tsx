import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Globe, Compass, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Travel Together. Explore More.
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            We connect travelers with shared interests, helping them discover
            new destinations, create unforgettable memories, and travel safely
            with like-minded people.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Traveling alone can be challenging, and planning group trips can
              be complicated. Our mission is to simplify travel by connecting
              people who want to explore the world together.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are a solo traveler, a group explorer, or a trip
              organizer, we provide the tools to plan, join, and manage trips
              seamlessly.
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="text-blue-600" />
                <span className="font-medium">
                  Discover destinations worldwide
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-blue-600" />
                <span className="font-medium">
                  Connect with verified travelers
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Compass className="text-blue-600" />
                <span className="font-medium">
                  Plan trips with confidence
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="text-blue-600" />
                <span className="font-medium">
                  Build meaningful travel experiences
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Stand For
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We prioritize user verification, transparency, and secure
                interactions.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Travel is better together. We foster a supportive and inclusive
                community.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Freedom</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Travel your way — solo, group, or adventure-based trips.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We use modern technology to make trip planning effortless.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Next Journey?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join our growing community and start exploring the world with
            confidence.
          </p>
          <Link href={'/trips'}>
            <Button size="lg" className="px-8 cursor-pointer">
            Explore Trips
          </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
