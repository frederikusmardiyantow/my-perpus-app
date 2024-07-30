import useAxios, { myHeader } from ".";

export const getPeminjamanAll = async () => {
    try {
        const response = await useAxios.get(`/peminjaman`, {
            headers: myHeader(),
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const addPeminjaman = async (data) => {
    try {
        const response = await useAxios.post(`/peminjaman`, data, {
            headers: myHeader(),
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
