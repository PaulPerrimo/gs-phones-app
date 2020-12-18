import { Phone } from "./models/Phone";

const baseURL = `${process.env.REACT_APP_BACKEND_URL}/phones`;

export interface Phones {
  phones?: Phone[];
  message?: string;
}

export interface DataPhone {
  message?: string;
  phone?: Phone;
}

export const fetchPhones = async (): Promise<Phones> => {
  try {
    const res = await fetch(baseURL);
    return res.json();
  } catch (error) {
    return { message: error };
  }
};

export const fetchPhoneById = async (id: string): Promise<DataPhone> => {
  try {
    const res = await fetch(`${baseURL}/${id}`);
    return res.json();
  } catch (error) {
    return { message: error };
  }
};

export const updatePhone = async (id: string, phone: Phone): Promise<DataPhone> => {
  const body = JSON.stringify(phone);
  try {
    const res = await fetch(`${baseURL}/${id}`, { method: "PATCH", body, headers: { "Content-Type": "application/json" } });
    return res.json();
  } catch (error) {
    return { message: error };
  }
};

export const createPhone = async (phone: Phone): Promise<DataPhone> => {
  try {
    const body = new FormData();
    Object.keys(phone).forEach((k) => body.append(k, phone[k]));
    const res = await fetch(`${baseURL}`, { method: "POST", body });
    return res.json();
  } catch (error) {
    return { message: error };
  }
};

export const deletePhone = async (id: string): Promise<void | { message: string }> => {
  try {
    const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
    return res.json();
  } catch (error) {
    return { message: error };
  }
};
