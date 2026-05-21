import React from 'react';
import Link from 'next/link';

export default function Exams() {
  const examCategories = [
    { title: "SSC Preparation", description: "Model tests for all groups (Science, Arts, Commerce).", color: "bg-blue-100" },
    { title: "HSC Preparation", description: "Subject-wise mock exams and previous year question papers.", color: "bg-green-100" },
    { title: "University Admission", description: "DU, BUET, Medical and other university admission tests.", color: "bg-purple-100" },
    { title: "BCS Preparation", description: "Preliminary and written model tests for BCS aspirants.", color: "bg-yellow-100" },
    { title: "Government Jobs", description: "General knowledge, Bengali, English, and Math mock tests.", color: "bg-red-100" },
    { title: "Bank Jobs", description: "Preparation for standard bank job recruitment exams.", color: "bg-indigo-100" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Available Exams & Model Tests</h1>
        <p className="text-gray-600 mt-2">Select your target exam and start testing your knowledge.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examCategories.map((exam, index) => (
          <div key={index} className={`rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col`}>
            <div className={`h-2 ${exam.color}`}></div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{exam.title}</h3>
              <p className="text-gray-600 flex-1 mb-4">{exam.description}</p>
              <Link href="#" className="inline-block text-center w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition">
                Browse Tests
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
