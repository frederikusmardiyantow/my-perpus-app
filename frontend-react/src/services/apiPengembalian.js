import useAxios, { myHeader } from ".";

export const getPengembalianAll = async () => {
    try {
        const response = await useAxios.get(`/pengembalian`, {
            headers: myHeader(),
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const kembalikanBuku = async (data) => {
    try {
        const response = await useAxios.put(`/pengembalian/${data.id_peminjaman}`, data, {
            headers: myHeader(),
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
