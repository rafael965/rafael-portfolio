import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { Work } from "@/components/home/Work";
import { Services } from "@/components/home/Services";
import { Experience } from "@/components/home/Experience";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Work />
      <Services />
      <Experience />
      <Testimonials />
    </>
  );
}
