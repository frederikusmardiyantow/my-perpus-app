import useAxios, { myHeader } from ".";

export const getCustomerAll = async () => {
  try {
    const response = await useAxios.get(`/customer`, {
      headers: myHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const addCustomer = async (data) => {
  try {
    const response = await useAxios.post(`/customer`, data, {
      headers: myHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
