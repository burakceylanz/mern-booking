import { useForm, FormProvider } from "react-hook-form";
import FormDetails from "./FormDetails";
import { useEffect } from "react";
import { HotelType } from "../../../../backend/src/models/hotels";
import { Button } from "@/components/ui/button";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isEdit: boolean;
  onDelete: (hotelId: string) => void;
};

const ManageHotelForm = ({ onSave, hotel, isEdit,onDelete }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formData: HotelFormData) => {
    const formDataToSend = new FormData();

    if (hotel && isEdit) {
      formDataToSend.append("hotelId", hotel._id);
    }

    formDataToSend.append("name", formData.name);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("pricePerNight", formData.pricePerNight.toString());
    formDataToSend.append("starRating", formData.starRating.toString());
    formDataToSend.append("type", formData.type);
    formDataToSend.append("adultCount", formData.adultCount.toString());
    formDataToSend.append("childCount", formData.childCount.toString());

    formData.facilities.forEach((facility, index) => {
      formDataToSend.append(`facilities[${index}]`, facility);
    });

    if (formData.imageUrls && formData.imageUrls.length > 0) {
      formData.imageUrls.forEach((url, index) => {
        formDataToSend.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formData.imageFiles).forEach((imageFile) => {
      formDataToSend.append("imageFiles", imageFile);
    });

    onSave(formDataToSend);
  });

  const handleDelete = () => {
    if (hotel && hotel._id) {
      onDelete(hotel._id); 
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <FormDetails />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-col md:flex-row gap-2.5">
            <Button type="submit">Save</Button>
            {hotel && (
              <Button
                type="button"
                onClick={handleDelete}
                className="bg-transparent border border-[#7cc475] text-[#7cc475]"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
