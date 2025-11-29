import React from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, className }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-500/10"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <svg className="w-5 h-5 text-gray-400 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

export default SearchBar
