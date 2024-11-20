import * as api from "@/api";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ManageHotelForm from "@/forms/ManageHotelForm/ManageHotelForm";
import { useToast } from "@/hooks/use-toast";

export default function MyHotelDetails() {
  const { toast } = useToast();
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const { data: hotel } = useQuery(
    "getMyHotelDetails",
    () => api.getMyHotelDetails(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const mutation = useMutation(api.updateMyHotelById, {
    onSuccess: () => {
      toast({
        title: "Successfully",
        description: `Hotel successfully updated`,
      });
      navigate("/my-hotels");
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

  const deleteMutation = useMutation(api.deleteMyHotelById, {
    onSuccess: () => {
      toast({
        title: "Successfully",
        description: `Hotel successfully deleted`,
      });
      navigate("/my-hotels");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `Delete Hotel error: ${error}`,
      });
    },
  });

  const handleDelete = (hotelId: string) => {
    deleteMutation.mutate({ hotelId });
  };

  return (
    <ManageHotelForm
      hotel={hotel}
      onSave={handleSave}
      isEdit={true}
      onDelete={handleDelete}
    />
  );
}
