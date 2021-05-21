import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoaderReact from "react-loader-spinner";

const Loader = () => {
  return (
    <LoaderReact type="Circles" color="#00BFFF" height={100} width={100} />
  );
};

export default Loader;
