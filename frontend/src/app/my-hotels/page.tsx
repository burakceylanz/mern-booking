import { useQuery } from "react-query";
import * as api from "@/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const { data: hotelData } = useQuery("getMyHotels", api.getMyHotels, {
    onSuccess: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(true);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `My Hotel List error: ${Error}`,
      });
    },
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground font-bold pb-3">My Hotels</h1>
        <Link to="/add-hotel">
          <Button>Add New Hotel</Button>
        </Link>
      </div>
      {hotelData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {hotelData.map((hotel) => (
            <Link
              to={`/my-hotels/${hotel._id}`}
              className="space-y-3"
              key={hotel._id}
            >
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
                <h3 className="font-medium leading-none">{hotel.name}</h3>
                <p className="text-xs text-muted-foreground">
                  ${hotel.pricePerNight}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </section>
  );
}
