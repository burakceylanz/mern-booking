import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/models/hotels";

type Props = {
  hotel: HotelType;
};

export default function SearchResultsCard({ hotel }: Props) {
  if (!hotel) {
    return <h1 className="text-foreground font-bold pb-3">No Hotels found</h1>;
  }

  return (
    <Link to={`/hotels/${hotel._id}`} className="space-y-3" key={hotel._id}>
      <div className="overflow-hidden rounded-md relative">
        <img
          className="h-auto w-full object-cover transition-all hover:scale-105 aspect-[3/4]"
          src={hotel.imageUrls[0]}
          alt={`Image of ${hotel.name}`}
        />
        <div className="absolute bottom-4 right-4">
          <div className="bg-[#7cc475] flex items-center gap-x-0.5 text-white px-2 py-0.5 rounded-lg">
            <Star className="text-white w-4 h-4" />
            <span className="text-xs">{hotel.starRating}</span>
          </div>
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-x-1 text-[11px]">
          {hotel.facilities.slice(0, 3).map((fac) => (
            <div className="text-[#7cc475] bg-white border rounded-md px-1 border-[#7cc475]">
              {fac}
            </div>
          ))}
          {hotel.facilities.length > 3 && (
            <div className="text-gray-400">
              +{hotel.facilities.length - 3} more
            </div>
          )}
        </div>

        <h3 className="font-medium leading-none">{hotel.name}</h3>
        <p className="text-xs text-muted-foreground">
          ${hotel.pricePerNight} per night
        </p>
      </div>
    </Link>
  );
}
