
import Image from "next/image";
import React from "react";
import ButtonClick from "./Button";

const Nevber = async () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });


  return (
    // w-full যোগ করা হয়েছে
    <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2 pt-2 px-4">
      <div className="flex gap-2 items-center">
        <div>
          <Image src="/logo.webp" alt="logo" height={20} width={50} />
        </div>
        <div>
          <h1 className="text-4xl text-red-600 font-bold">Bangla News 24</h1>
          <p className="text-gray-400">{date}</p>
        </div>
      </div>
     
      <div className="flex gap-5">
        <ButtonClick></ButtonClick>
      </div>
    </div>
  );
};

export default Nevber;
