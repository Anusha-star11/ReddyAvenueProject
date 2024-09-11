import React from 'react';

function About() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome to ReddyAvenue Colony</h1>
        <p className="text-center text-xl text-gray-600 mb-8">
          A Peaceful, Secure, and Vibrant Community
        </p>
        
        <div className="space-y-8">
          {/* Parks Section */}
          <div className="bg-green-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-green-800">🌳 Parks</h2>
            <p className="text-gray-700">
              At ReddyAvenue, we believe in fostering a healthy and active lifestyle. Our beautifully landscaped parks are perfect for family picnics, morning walks, and quiet evening strolls.
            </p>
          </div>

          {/* Community Hall Section */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-800">🏢 Community Hall</h2>
            <p className="text-gray-700">
              Our spacious community hall is the heart of social events and gatherings. From festivals to family functions, this hall is the center of community life.
            </p>
          </div>

          {/* CCTV & Security Section */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-yellow-800">🎥 24/7 CCTV Security</h2>
            <p className="text-gray-700">
              Your safety is our priority. With CCTV cameras and dedicated security guards, we ensure a safe environment for all residents.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-3xl font-semibold text-gray-800">Join Our Community</h3>
          <p className="text-gray-600 mt-4">
            ReddyAvenue Colony is a home where every resident is valued. We welcome you to explore our community and be a part of something special.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
