import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

const responses = [
  `{
  status:"OK"
  request_id:"51ad0aaa-27e7-48c4-972a-1e94be7ba47a"
  data:
  total_products:10347
  country:"US"
  domain:"www.amazon.com"
  products:
}`,
`{
  "status": "Bad Request",
  "request_id": "d23f0b4a-9e0f-4a9c-8b9e-5123ecf3e4f1",
  "error": {
    "code": 400,
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "issue": "Email is not formatted correctly"
      },
      {
        "field": "password",
        "issue": "Password must be at least 8 characters long"
      }
    ]
  }
}`
]

export default function Response() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  return (
    <div className="h-full">
      <div className="w-full py-3 px-5 flex justify-between items-center">
        <div className="gap-2">
          <label htmlFor="code">Status: </label>
          <select name="code" className="border-2" onChange={(e) => setSelectedIdx(Number(e.target.value))}>
            <option value="0">200</option>
            <option value="1">400</option>
          </select>
        </div>
        <div className="gap-2">
          <label htmlFor="code">Media Type: </label>
          <select name="code" className="border-2" >
            <option value="0">application/json</option>
          </select>
        </div>
      </div>
      <div className="bg-[#282A36] h-full px-2">
        <CopyBlock
          text={responses[selectedIdx]}
          language={"json"}
          showLineNumbers={false}
          theme={dracula}
          wrapLongLines={true}
        />
      </div>
    </div>
  );
}
