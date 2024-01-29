// Library & Package Import
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const handleErrorResponse = (error, action) => {
  console.error(`Error: saat ${action}`, error);
  throw error;
};

const RequestApi = async (method, url, data = {}, headers = {}, action) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}/${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    return handleErrorResponse(error, action);
  }
};

export { RequestApi };
