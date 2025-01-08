"use client";

import { useState, ReactNode } from "react";
import CodeSnippet from "./code-snippet";
import Response from "./response";
import Result from "./result";

const CodeOptions = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (s: string) => void;
}) => {
  let defaultStyle = "px-5 py-2 hover:cursor-pointer disabled:text-gray-400";
  let active = "text-blue-500 border-b-2 border-blue-500";
  return (
    <div className="flex border-b pt-3 text-sm text-gray-600 justify-center">
      <button
        className={`${defaultStyle} ${selected === "code-snippet" && active}`}
        onClick={() => setSelected("code-snippet")}
      >
        Code Snippet
      </button>
      <button
        className={`${defaultStyle} ${selected === "response" && active}`}
        onClick={() => setSelected("response")}
      >
        Example Response
      </button>
      <button
        className={`${defaultStyle} ${selected === "result" && active}`}
        onClick={() => setSelected("result")}
        disabled
      >
        Result
      </button>
    </div>
  );
};

const CodeComponent = ({ selected }: { selected: string }) => {
  const components: { [key: string]: ReactNode } = {
    "code-snippet": <CodeSnippet />,
    response: <Response />,
    result: <Result />,
  };

  return <div className="h-full text-sm">{components[selected]}</div>;
};

const CodePanel = () => {
  const [selected, setSelected] = useState<string>("code-snippet");

  return (
    <section className="flex-1 overflow-hidden h-full border-r">
      <CodeOptions selected={selected} setSelected={setSelected} />
      <CodeComponent selected={selected} />
    </section>
  );
};

export { CodeOptions, CodePanel };
