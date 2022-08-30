import React, { Fragment } from "react";

const TopTitle = ({ cname, welc, slogan }) => {
  return (
    <div className="text-center  industries-bnr">
      <h1 className="text-bold text-2xl text-white uppercase">{welc}</h1>

      <h5 className="md:text-3xl text-white">{cname}</h5>

      {/* <h3 className=" my-5 md:w-2/3 lg:w-3/4 text-white ml-5">{slogan}</h3> */}
    </div>
  );
};

export default TopTitle;
