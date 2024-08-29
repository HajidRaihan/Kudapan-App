// Library & Package Import
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APIURL;

const handleErrorResponse = (error, action) => {
  console.error(`Error: saat ${action}`, error);

  if (error.response.data.message === "Unauthorized") {
    window.location.href = "/login";
  }

  throw error;
};

const RequestApi = async (method, url, data = {}, headers = {}, action) => {
  // console.log(headers);
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}/${url}`,
      data,
      headers: {
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    return handleErrorResponse(error, action);
  }
};

export { RequestApi };
