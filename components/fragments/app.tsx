import React from "react";

export default function App() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1 text-gray-600">
        <label htmlFor="app">App</label>
        <select name="app" className="p-1 w-full border-2 rounded-lg">
          <option value="default-application_101">default-application_101</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 text-gray-600">
        <label htmlFor="api-key">API Key</label>
        <select name="api-key" className="p-1 w-full border-2 rounded-lg">
          <option value="default-application_101">12345-abcde-67890-fghij-12345</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 text-gray-600">
        <label htmlFor="request-url">Request URL</label>
        <select name="request-url" className="p-1 w-full border-2 rounded-lg">
          <option value="default-application_101">uipdfcompressor.com</option>
        </select>
      </div>
    </div>
  );
}
