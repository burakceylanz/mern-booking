import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageFiles");

  return (
    <div>
      <h1 className="text-foreground font-bold pb-3">Images</h1>
      <div className="rounded-lg border-dotted border-2 border-[#7cc475] py-12 flex flex-col gap-4 cursor-pointer">
        <div className="flex flex-col items-center justify-center space-y-4 ">
          <label className="cursor-pointer">
            <PlusIcon className="text-[#7cc475]" />
            {/* Hidden Input */}
            <Input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              {...register("imageFiles", {
                validate: (imageFiles) => {
                  const totalLength =
                    imageFiles.length + (existingImageUrls?.length || 0);
                  if (totalLength === 0) {
                    return "At least one image should be added";
                  }
                  if (totalLength > 6) {
                    return "Total number of images cannot be more than 6";
                  }
                  return true;
                },
              })}
            />
          </label>
        </div>
      </div>
      {errors.imageFiles && <span>{errors.imageFiles.message}</span>}
    </div>
  );
};

export default ImagesSection;
