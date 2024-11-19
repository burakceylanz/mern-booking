import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };
  return (
    <div>
      <h1 className="text-foreground font-bold pb-3">Images</h1>
      {existingImageUrls && (
        <div className="grid grid-cols-1 gap-4">
          {existingImageUrls.map((url) => (
            <div
              key={url}
              className="rounded-lg border-dotted border-2 border-[#7cc475] flex flex-col gap-4 cursor-pointer"
            >
              <div className="relative group">
                <img
                  src={url}
                  alt="Uploaded Image"
                  className="min-h-full object-cover rounded-lg"
                />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 hover:rounded-lg text-white transition-opacity duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-lg border-dotted border-2 border-[#7cc475] py-12 flex flex-col gap-4 cursor-pointer">
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
