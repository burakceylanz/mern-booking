import axios from "axios";
import { HotelType } from "../../backend/src/models/hotels.ts";
import { HotelSearchResponse } from "../../backend/src/shared/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signOut = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  if (!response) {
    throw new Error("Error during sign out");
  }
  return response.data;
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  if (!response) {
    throw new Error(response);
  }

  return response.data;
};

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/users/register`,
    {
      email,
      password,
      firstName,
      lastName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  if (!response) {
    throw new Error(response);
  }

  return response.data;
};

export const addHotel = async (hotelFormData: FormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/my-hotels`,
    hotelFormData,
    {
      withCredentials: true,
    }
  );

  if (!response) {
    throw new Error("Something went wrong");
  }

  return response.data;
};

export const getMyHotels = async (): Promise<HotelType[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/my-hotels/list`, {
    withCredentials: true,
  });

  if (!response) {
    throw new Error("Something went wrong");
  }
  return response.data.hotels;
};

export const getMyHotelDetails = async (
  hotelId: string
): Promise<HotelType> => {
  const response = await axios.get(
    `${API_BASE_URL}/api/my-hotels/list/${hotelId}`,
    {
      withCredentials: true,
    }
  );

  if (!response) {
    throw new Error("Something went wrong");
  }
  return response.data.hotel;
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/my-hotels/list/${hotelFormData.get("hotelId")}`,
    hotelFormData,
    {
      withCredentials: true,
    }
  );

  if (!response) {
    throw new Error("Failed to update Hotel");
  }

  return response.data;
};

export const deleteMyHotelById = async ({ hotelId }: { hotelId: string }) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/my-hotels/list/${hotelId}`,
    {
      withCredentials: true,
    }
  );

  if (!response) {
    throw new Error("Failed to update Hotel");
  }

  return response.data;
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  const response = await axios.get(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`,
    {
      withCredentials: true,
    }
  );

  if (!response) {
    throw new Error("Failed to searching Hotel");
  }

  return response.data;
};
