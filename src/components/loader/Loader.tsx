"use client";

import { BeatLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className=" z-50 absolute top-0 left-0 w-full h-full backdrop-blur flex justify-center items-center">
      <BeatLoader color="#34d399" />
    </div>
  );
}
