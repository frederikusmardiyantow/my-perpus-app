import useAxios, { myHeader } from ".";

export const getBukuAll = async () => {
  try {
    const response = await useAxios.get(`/buku`, {
      headers: myHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const addBuku = async (data) => {
  try {
    const response = await useAxios.post(`/buku`, data, {
      headers: myHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
