import axios from "axios";

const fetchBooks = async (apiUrl, config) => {
  try {
    const response = await axios.get(apiUrl, config);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (!response) {
      throw new Error("Fetched data are null.")
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      console.error(`No response received from API: ${error.request}`);
    } else {
      console.error(`Request failed: ${error.message}`);
    }

    return null;
  }
}

export { fetchBooks }
