'use client'

import { useState } from 'react'

export default function CodeSubmissionForm() {
  const [language, setLanguage] = useState('javascript') // Default language
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Language:', language)
    console.log('Code:', code)
    // You can send the data to your server or handle it as needed
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Submit Your Code</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Language selection */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Select Code Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        {/* Code textarea */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Write Your Code
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Write your code here..."
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Code
        </button>
      </form>
    </div>
  )
}
