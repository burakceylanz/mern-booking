import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
import { Label } from "@/components/ui/label";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
       <h1 className="text-foreground font-bold pb-3">Facilities</h1>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <Label key={facility}>
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            <span className="pl-1.5">{facility}</span>
          </Label>
        ))}
      </div>
      {errors.facilities && (
        <span>
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
