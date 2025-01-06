import React from 'react'

export default function Headers() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1 text-gray-600">
        <label htmlFor="api-host">Api-Host</label>
        <select name="api-host" className="p-1 w-full border-2 rounded-lg" disabled>
          <option value="default-application_101">default-application_101</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 text-gray-600">
        <label htmlFor="content-type">Content-Type</label>
        <select name="content-type" className="p-1 w-full border-2 rounded-lg" disabled>
          <option value="default-application_101">application/x-www-form-urlencoded</option>
        </select>
      </div>
    </div>
  )
}
