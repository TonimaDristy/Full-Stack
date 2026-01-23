
"use client";

export default function SearchBar({
    value,
    onChange,
}: {
    value: string;
    onChange: (text: string) => void;
}) {
    return (
        <input
            type="text"
            placeholder="Search resources..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
    );
}





/*
{
  "title": "Database Management System Slides",
  "description": "Lecture slides covering ER models, normalization, SQL, and transactions",
  "category": "Database Systems",
  "semester": "4",
  "type": "PPTX"
}
*/
