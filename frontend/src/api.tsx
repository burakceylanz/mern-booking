import axios from "axios";
import { HotelType } from "../../backend/src/models/hotels.ts";

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

  return response.data;
};
