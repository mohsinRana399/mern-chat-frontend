import React from "react";
import HashLoader from "react-spinners/HashLoader";
const Loader = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HashLoader color={"#00B0FF"} loading={true} size={150} />
    </div>
  );
};

export default Loader;
