import * as api from "@/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ManageHotelForm from "@/forms/ManageHotelForm/ManageHotelForm";

export default function MyHotelDetails() {
  const {hotelId} = useParams();
  const { data: hotel } = useQuery("getMyHotelDetails", ()=> api.getMyHotelDetails(hotelId ||''),{
    enabled: !!hotelId
  }
);
  return (
    <ManageHotelForm hotel={hotel}/>
  )
}
