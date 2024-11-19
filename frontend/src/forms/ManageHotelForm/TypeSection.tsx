import { hotelTypes } from "@/config/hotel-options-config";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
    setValue, // You can use this to set the radio group value dynamically
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h1 className="text-foreground font-bold pb-3">Type</h1>
      <RadioGroup
        onValueChange={(value) => setValue("type", value)} 
        defaultValue=""
      >
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
          {hotelTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <RadioGroupItem
                id={type}
                value={type}
                {...register("type", { required: "This field is required" })}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
      {errors.type && <span>{errors.type.message}</span>} 
    </div>
  );
};

export default TypeSection;
