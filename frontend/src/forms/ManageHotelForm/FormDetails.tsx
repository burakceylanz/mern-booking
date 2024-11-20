import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HotelFormData } from "./ManageHotelForm";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { Button } from "@/components/ui/button";

const FormDetails = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();


  return (
    <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="w-full md:flex md:flex-col md:gap-4 md:w-3/4">
          <h1 className="text-foreground font-bold">Add Hotel</h1>
          <div>
            <Label htmlFor="name">
              Name
              <Input
                type="text"
                {...register("name", { required: "This field is required" })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="city">
              City
              <Input
                type="text"
                {...register("city", { required: "This field is required" })}
              />
              {errors.city && <span>{errors.city.message}</span>}
            </Label>
            <Label htmlFor="country">
              Country
              <Input
                type="text"
                {...register("country", { required: "This field is required" })}
              />
              {errors.country && <span>{errors.country.message}</span>}
            </Label>
          </div>
          <div>
            <Label htmlFor="description">
              Description
              <Textarea
                {...register("description", {
                  required: "This field is required",
                })}
                className="!min-h-36"
              />
              {errors.description && <span>{errors.description.message}</span>}
            </Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pricePerNight">
                Price Per Night
                <Input
                  type="number"
                  min={1}
                  {...register("pricePerNight", {
                    required: "This field is required",
                  })}
                />
                {errors.pricePerNight && (
                  <span>{errors.pricePerNight.message}</span>
                )}
              </Label>
            </div>
            <div>
              <Label htmlFor="starRating">
                Star Rating
                <Select
                  value={watch("starRating")}
                  onValueChange={(value: string) => setValue("starRating", value)}
                  {...register("starRating", {
                    required: "This field is required",
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Rate" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
                {errors.starRating && <span>{errors.starRating.message}</span>}
              </Label>
            </div>
          </div>
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <Button type="submit">Save</Button>
        </div>
        <div className="w-full md:w-1/4">
          <ImagesSection />
        </div>
      </div>
    </section>
  );
};

export default FormDetails;
