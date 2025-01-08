export const codeSnippets = [
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
  {
    code: `using System.Net.Http.Headers;
var client = new HttpClient();
var request = new HttpRequestMessage
{
	Method = HttpMethod.Post,
	RequestUri = new Uri("https://tesseract-compressor.p.rapidapi.com/api/compress/pdf"),
	Headers =
	{
		{ "x-rapidapi-key", "ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35" },
		{ "x-rapidapi-host", "tesseract-compressor.p.rapidapi.com" },
	},
};
using (var response = await client.SendAsync(request))
{
	response.EnsureSuccessStatusCode();
	var body = await response.Content.ReadAsStringAsync();
	Console.WriteLine(body);
}`,
    language: "c#",
  },
  {
    code: `POST /api/compress/pdf HTTP/1.1
X-Rapidapi-Key: ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35
X-Rapidapi-Host: tesseract-compressor.p.rapidapi.com
Content-Type: application/x-www-form-urlencoded
Host: tesseract-compressor.p.rapidapi.com`,
    language: "http",
  },
  {
    code: `AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "https://tesseract-compressor.p.rapidapi.com/api/compress/pdf")
	.setHeader("x-rapidapi-key", "ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35")
	.setHeader("x-rapidapi-host", "tesseract-compressor.p.rapidapi.com")
	.setHeader("Content-Type", "application/x-www-form-urlencoded")
	.execute()
	.toCompletableFuture()
	.thenAccept(System.out::println)
	.join();

client.close();`,
    language: "java",
  },
  {
    code: `val client = OkHttpClient()

val request = Request.Builder()
	.url("https://tesseract-compressor.p.rapidapi.com/api/compress/pdf")
	.post(null)
	.addHeader("x-rapidapi-key", "ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35")
	.addHeader("x-rapidapi-host", "tesseract-compressor.p.rapidapi.com")
	.addHeader("Content-Type", "application/x-www-form-urlencoded")
	.build()

val response = client.newCall(request).execute()`,
    language: "kotlin",
  },
  {
    code: `const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('POST', 'https://tesseract-compressor.p.rapidapi.com/api/compress/pdf');
xhr.setRequestHeader('x-rapidapi-key', 'ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35');
xhr.setRequestHeader('x-rapidapi-host', 'tesseract-compressor.p.rapidapi.com');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

xhr.send(data);`,
    language: "javascript",
  },
  {
    code: `<?php

$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://tesseract-compressor.p.rapidapi.com/api/compress/pdf",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "POST",
	CURLOPT_POSTFIELDS => "",
	CURLOPT_HTTPHEADER => [
		"Content-Type: application/x-www-form-urlencoded",
		"x-rapidapi-host: tesseract-compressor.p.rapidapi.com",
		"x-rapidapi-key: ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo $response;
}`,
    language: "php",
  },
  {
    code: `const qs = require('querystring');
const http = require('https');

const options = {
	method: 'POST',
	hostname: 'tesseract-compressor.p.rapidapi.com',
	port: null,
	path: '/api/compress/pdf',
	headers: {
		'x-rapidapi-key': 'ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35',
		'x-rapidapi-host': 'tesseract-compressor.p.rapidapi.com',
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(qs.stringify({}));
req.end();`,
    language: "javascript",
  },
  {
    code: `import http.client

conn = http.client.HTTPSConnection("tesseract-compressor.p.rapidapi.com")

payload = ""

headers = {
    'x-rapidapi-key': "ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35",
    'x-rapidapi-host': "tesseract-compressor.p.rapidapi.com",
    'Content-Type': "application/x-www-form-urlencoded"
}

conn.request("POST", "/api/compress/pdf", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))`,
    language: "python",
  },
  {
    code: `curl --request POST 
	--url https://tesseract-compressor.p.rapidapi.com/api/compress/pdf 
	--header 'Content-Type: application/x-www-form-urlencoded' 
	--header 'x-rapidapi-host: tesseract-compressor.p.rapidapi.com' 
	--header 'x-rapidapi-key: ae7e443102msh632ac49ed4b7ff3p12f5a7jsn6810e7c4ff35'`,
    language: "shell",
  },
];