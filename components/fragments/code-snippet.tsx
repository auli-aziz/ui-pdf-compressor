import { CodeBlock, dracula } from "react-code-blocks";

const codeSnippets = [
  {
    code: `package main

import (
  "fmt"
  "net/http"
  "io"
)

func main() {

  url := "https://tesseract-compressor.p.rapidapi.com/api/compress/pdf"

  req, _ := http.NewRequest("POST", url, nil)

  req.Header.Add("x-rapidapi-key", "ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35")
  req.Header.Add("x-rapidapi-host", "tesseract-compressor.p.rapidapi.com")
  req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

  res, _ := http.DefaultClient.Do(req)

  defer res.Body.Close()
  body, _ := io.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))

}`,
    language: "go",
  },
  {
    code: `CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
curl_easy_setopt(hnd, CURLOPT_URL, "https://tesseract-compressor.p.rapidapi.com/api/compress/pdf");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "x-rapidapi-key: ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35");
headers = curl_slist_append(headers, "x-rapidapi-host: tesseract-compressor.p.rapidapi.com");
headers = curl_slist_append(headers, "Content-Type: application/x-www-form-urlencoded");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

CURLcode ret = curl_easy_perform(hnd);`,
    language: "c",
  },
];

export default function CodeSnippet() {
  return (
    <div>
      {codeSnippets.map((snippet, index) => (
        <CodeBlock
          key={index}
          text={snippet.code}
          language={snippet.language}
          showLineNumbers={true}
          theme={dracula}
        />
      ))}
    </div>
  );
}
