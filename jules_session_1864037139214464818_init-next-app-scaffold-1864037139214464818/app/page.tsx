import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6">Master Your Exams with AI-Powered Tutoring</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          The ultimate preparation platform for Bangladeshi students. Get ready for SSC, HSC, BCS, University Admission tests, Government Job exams, and Bank Job interviews.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/exams" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition">
            Start Mock Exam
          </Link>
          <Link href="/dashboard" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md font-semibold text-lg hover:bg-gray-50 transition">
            View Dashboard
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Board Exams</h3>
          <p className="text-gray-600 mb-4">Comprehensive model tests and tailored guidance for SSC and HSC exams.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">University Admissions</h3>
          <p className="text-gray-600 mb-4">Subject-specific preparation and mock tests to secure your spot in top universities.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Competitive Jobs</h3>
          <p className="text-gray-600 mb-4">Prepare for BCS, Government Jobs, and Bank Job interviews with up-to-date model tests.</p>
        </div>
      </section>
    </div>
  );
}
