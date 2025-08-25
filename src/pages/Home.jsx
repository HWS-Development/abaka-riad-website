import Hero from "../components/home/Hero";
import RoomsGrid from "../components/home/RoomsGrid";
import Facilities from "../components/home/Facilities";
import Reviews from "../components/home/Reviews";
import Location from "../components/home/Location";
import AboutTeaser from "../components/home/AboutTeaser";
import Discover from "../components/home/Discover";
import Intro from "../components/home/Intro";
import Extras from "../components/home/Extras";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <RoomsGrid />
      <Facilities />
      <Extras />
      <AboutTeaser />
      <Discover />
      <Reviews />
      <Location />
    </>
  );
}
