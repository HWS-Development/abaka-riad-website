export default function FacilityChips({ items=[] }) {
    return (
      <div className="flex flex-wrap gap-3">
        {items.map((txt, i)=>(
          <span key={i} className="chip">{txt}</span>
        ))}
      </div>
    );
  }
  