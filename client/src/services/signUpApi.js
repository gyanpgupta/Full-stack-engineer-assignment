import axios from "axios";

const signUpServies = async (data) => {
  return await axios
    .post(`${process.env.REACT_APP_URL}/sign-up`, data)
    .then((resData) => resData.data)
    .catch((err) => {
      throw err;
    });
};

export default signUpServies;
