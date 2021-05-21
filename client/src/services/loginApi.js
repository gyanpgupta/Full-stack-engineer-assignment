import axios from "axios";

const loginServies = async (data) => {
  return await axios
    .post(`${process.env.REACT_APP_URL}/login`, data)
    .then((resData) => resData.data)
    .catch((err) => console.log(err));
};

export default loginServies;
