import ManageHotelForm from "@/forms/ManageHotelForm/ManageHotelForm";
import { useMutation } from "react-query";
import * as api from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function AddHotelPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(api.addHotel, {
    onSuccess: () => {
      toast({
        title: "Successfully",
        description: "Hotel added successfully",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `Add Hotel error: ${error}`,
      });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutation.mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} />;
}
