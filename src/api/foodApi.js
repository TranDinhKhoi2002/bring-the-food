import axiosClient from "./axiosClient";

const foodApi = {
  getFoods(type, params) {
    return axiosClient.get(type, { params });
  },
  getFoodById(id) {
    const url = `/best-foods/${id}`;
    return axiosClient.get(url);
  },
  removeFoodById(id) {
    const url = `/best-foods/${id}`;
    return axiosClient.delete(url);
  },
};

export default foodApi;
