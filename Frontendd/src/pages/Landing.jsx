import React, { useState } from 'react';

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Eco-Challenge Hub!</h1>
      <button
        className="bg-blue-500 text-white py-2 px-6 rounded"
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
            />
            <button className="w-full bg-green-500 text-white py-2 rounded">Submit</button>
            <button
              className="w-full mt-2 text-gray-500"
              onClick={() => setShowLogin(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

