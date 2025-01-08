import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { Button } from "@/components/ui/button";
import { codeSnippets } from "@/lib/data/codes";

export default function CodeSnippet() {
  const [languageIdx, setLanguageIdx] = useState<number>(0);

  function handleTestAPI() {
    alert("Testing API...");
  }
  return (
    <div className="break-words h-full overflow-hidden">
      <div className="w-full py-3 px-5 flex justify-between items-center">
        <div className="gap-2">
          <label htmlFor="code">Language: </label>
          <select
            name="code"
            className="border-2"
            onChange={(e) => setLanguageIdx(Number(e.target.value))}
          >
            <option value="0">Go</option>
            <option value="1">C</option>
            <option value="2">C#</option>
            <option value="3">HTTP</option>
            <option value="4">Java</option>
            <option value="5">Kotlin</option>
            <option value="6">JavaScript</option>
            <option value="7">PHP</option>
            <option value="8">Node.js</option>
            <option value="9">Python</option>
            <option value="10">Shell</option>
          </select>
        </div>
        <Button
          onClick={handleTestAPI}
          className=" bg-gray-900 hover:bg-gray-800 text-white border border-gray-200 rounded-full flex items-center justify-center"
        >
          Test API
        </Button>
      </div>
      <div className="bg-[#282A36] h-full">
        <CopyBlock
          text={codeSnippets[languageIdx].code}
          language={codeSnippets[languageIdx].language}
          showLineNumbers={false}
          theme={dracula}
          wrapLongLines={true}
        />
      </div>
    </div>
  );
}
