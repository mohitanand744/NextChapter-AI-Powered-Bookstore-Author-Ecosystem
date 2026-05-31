import { axiosInstance } from "../../services/api";

export const booksApis = {
  getSingleBook: async (id) => {
    console.log(id);

    const response = await axiosInstance.get(`/books/${id}`);

    console.log(response);

    return response.data;
  },

  getAllBooks: async (params) => {
    const response = await axiosInstance.get(`/books`, {
      params,
    });

    console.log(response);
    return response.data;
  },

  getSuggestions: async (userSearchPhrase) => {
    const response = await axiosInstance.get(`/books/getSuggestions`, {
      params: { userSearchPhrase },
    });
    return response.data;
  }
};
