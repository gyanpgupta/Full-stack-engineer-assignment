import axios from "axios";

const getArticals = async () => {
  return await axios
    .get(`${process.env.REACT_APP_URL}`)
    .then((resData) => resData.data)
    .catch((err) => console.log(err));
};

const getArtical = async (data) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .post(`${process.env.REACT_APP_URL}/read-artical`, data, {
      headers: headers,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export { getArticals, getArtical };
