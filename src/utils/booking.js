export const HOTELRUNNER_BASE =
  "https://riad-abaka-hotel-boutique.hotelrunner.com/bv3/search";

export function buildHotelRunnerUrl({ checkin, checkout, adults=2, children=0, rooms=1, promo="" }) {
  const room = { adult_count: adults, guest_count: adults + children, child_count: children, child_ages: [] };

  const searchObj = {
    checkin_date: checkin,
    checkout_date: checkout,
    day_count: null,
    room_count: rooms,
    total_adult: adults,
    total_child: children,
    rooms: [room],
    guest_rooms: { "0": room },
    coupon_code: promo || undefined
  };

  const qs = new URLSearchParams({ search: JSON.stringify(searchObj) }).toString();
  return `${HOTELRUNNER_BASE}?${qs}`;
}
