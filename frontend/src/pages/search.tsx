import { useSearchContext } from "@/context/SearchContext";
import { useQuery } from "react-query";
import * as api from "@/api";
import { useState } from "react";
import Loading from "@/components/ui/loading";
import SearchResultsCard from "@/components/search-result-card";
import Pagination from "@/components/pagination";

export default function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    api.searchHotels(searchParams),
  );
  if (!hotelData) {
    return <Loading />;
  }
  return (
    <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div>
        <h1 className="text-foreground font-bold pb-3">
          {hotelData?.pagination.total} Hotels found
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}
      </div>
      <Pagination
        page={hotelData?.pagination.page || 1}
        pages={hotelData?.pagination.pages || 1}
        onPageChange={(page) => setPage(page)}
      />
    </section>
  );
}
