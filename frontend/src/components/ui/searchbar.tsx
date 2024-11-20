import { useSearchContext } from "@/context/SearchContext";
import { Telescope } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "./date-picker";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-3  m-3 bg-[#7cc475] rounded-xl shadow-md grid grid-cols-2 lg:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1">
        <Telescope className="mr-2 w-6 h-6 text-white" />
        <Input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none bg-white"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex px-2 py-1 gap-2">
        <Label className="items-center flex text-white">
          Adults:
          <Input
            className="w-full p-1 focus:outline-none bg-white text-black"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </Label>
        <Label className="items-center flex text-white">
          Children:
          <Input
            className="w-full p-1 focus:outline-none bg-white text-black"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </Label>
      </div>
      <div className="w-fit">
        <DatePicker date={checkIn} setDate={setCheckIn} />
      </div>
      <div className="w-fit">
        <DatePicker date={checkOut} setDate={setCheckOut} />
      </div>
      <div className="flex gap-1">
        <Button className="bg-black">
          Search
        </Button>
        <Button className="bg-white text-[#7cc475]">
          Clear
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
