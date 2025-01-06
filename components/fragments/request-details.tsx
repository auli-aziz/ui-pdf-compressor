"use client";

import { useState, ReactNode } from "react";
import App from "./app";
import Params from "./params";
import Headers from "./headers";
import Authorizations from "./authorization";

const RequestOptions = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (s: string) => void;
}) => {
  let defaultStyle = "px-5 py-2 hover:cursor-pointer";
  let active = "text-blue-500 border-b-2 border-blue-500";
  return (
    <div className="flex border-b pt-3 text-sm text-gray-600 justify-center">
      <button
        className={`${defaultStyle} ${selected === "app" && active}`}
        onClick={() => setSelected("app")}
      >
        App
      </button>
      <button
        className={`${defaultStyle} ${selected === "params" && active}`}
        onClick={() => setSelected("params")}
      >
        Params
      </button>
      <button
        className={`${defaultStyle} ${selected === "headers" && active}`}
        onClick={() => setSelected("headers")}
      >
        Headers
      </button>
      <button
        className={`${defaultStyle} ${selected === "authorizations" && active}`}
        onClick={() => setSelected("authorizations")}
      >
        Authorizations
      </button>
    </div>
  );
};

const RequestComponent = ({ selected }: { selected: string }) => {
  const components: { [key: string]: ReactNode } = {
    app: <App />,
    params: <Params />,
    headers: <Headers />,
    authorizations: <Authorizations />,
  };

  return <div className="h-full p-3 text-sm">{components[selected]}</div>;
};

const RequestSection = () => {
  const [selected, setSelected] = useState<string>("app");

  return (
    <section className="flex-1 h-full border-r">
      <RequestOptions selected={selected} setSelected={setSelected} />
      <RequestComponent selected={selected} />
    </section>
  );
};

export { RequestOptions, RequestSection };
