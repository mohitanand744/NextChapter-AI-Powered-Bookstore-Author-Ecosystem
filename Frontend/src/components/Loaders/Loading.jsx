import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-coffee">
      <img
        className="w-full h-full hidden md:block object-contain"
        src="/images/website_Loader.gif"
        alt=""
      />
      <img
        className="w-full h-full block md:hidden object-contain"
        src="/images/website_Loader_mobile.gif"
        alt=""
      />
    </div>
  );
};

export default Loading;


