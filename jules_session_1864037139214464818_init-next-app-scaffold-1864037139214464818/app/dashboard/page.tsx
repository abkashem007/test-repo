import React from 'react';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Overall Readiness</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">78%</p>
          <p className="text-sm text-gray-500 mt-1">+5% from last week</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Mock Exams Taken</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">12</p>
          <p className="text-sm text-gray-500 mt-1">4 this week</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg. Score</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">82/100</p>
          <p className="text-sm text-gray-500 mt-1">Top 15% of students</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Performance</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          <li className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">BCS Preliminary Model Test #4</p>
              <p className="text-sm text-gray-500">Taken on May 15, 2024</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Score: 85%
              </span>
            </div>
          </li>
          <li className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">HSC Physics Paper 1 Mock</p>
              <p className="text-sm text-gray-500">Taken on May 12, 2024</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Score: 72%
              </span>
            </div>
          </li>
          <li className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Dhaka University &apos;A&apos; Unit Mock</p>
              <p className="text-sm text-gray-500">Taken on May 10, 2024</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Score: 88%
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
