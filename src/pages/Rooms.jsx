import RoomsHeader from "../components/rooms/Header";
import RoomsList from "../components/rooms/List";
import GoodToKnow from "../components/rooms/GoodToKnow";
import PoliciesAccordion from "../components/rooms/PoliciesAccordion";

export default function Rooms() {
  return (
    <>
      <RoomsHeader />
      <RoomsList />
      <GoodToKnow />
      <PoliciesAccordion />
    </>
  );
}
