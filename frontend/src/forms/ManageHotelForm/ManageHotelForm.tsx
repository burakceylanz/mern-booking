import { useForm, FormProvider } from "react-hook-form";
import FormDetails from "./FormDetails";
import { useEffect } from "react";

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

const ManageHotelForm = ({ onSave, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formData: HotelFormData) => {
    const formDataToSend = new FormData();

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

    Array.from(formData.imageFiles).forEach((imageFile) => {
      formDataToSend.append("imageFiles", imageFile);
    });
    onSave(formDataToSend);
  });
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <FormDetails />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
