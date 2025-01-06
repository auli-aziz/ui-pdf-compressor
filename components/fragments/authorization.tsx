import { CheckCircledIcon } from "@radix-ui/react-icons";
import React from "react";

export default function Authorizations() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center pt-10">
        <CheckCircledIcon className="h-10 w-10" />
        <h3 className="mt-2 font-bold text-xl">Authorizations</h3>
        <p className="mt-2">No additional authorizations needed</p>
      </div>
    </div>
  );
}
