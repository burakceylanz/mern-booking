import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h1 className="text-foreground font-bold pb-3">Guests</h1>
      <div className="grid grid-cols-2 gap-4">
        <Label htmlFor="adultCount">
          Adults
          <Input
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span>
              {errors.adultCount?.message}
            </span>
          )}
        </Label>
        <Label htmlFor="childCount">
          Children
          <Input
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span>
              {errors.childCount?.message}
            </span>
          )}
        </Label>
      </div>
    </div>
  );
};

export default GuestsSection;
