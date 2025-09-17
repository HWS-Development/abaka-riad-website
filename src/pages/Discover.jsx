import DiscoverList from "../components/discover/DiscoverList";
import DiscoverHeader from "../components/discover/Header";

export default function Discover() {

  return (
    <>
      {/* Header hero */}
      <DiscoverHeader/>

      {/* Alternating list */}
      <DiscoverList />
    </>
  );
}
