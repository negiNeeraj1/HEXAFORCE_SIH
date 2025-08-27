import React, { useState, useEffect } from "react";
import { collegeStatsService } from "../../services/collegeStatsService";

const CollegeStats = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStats, setTotalStats] = useState({
    totalColleges: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    fetchCollegeStats();
  }, []);

  const fetchCollegeStats = async () => {
    try {
      setLoading(true);
      const response = await collegeStatsService.getCollegeStats();
      setCollegeData(response.data);
      setTotalStats({
        totalColleges: response.totalColleges,
        totalStudents: response.totalStudents,
      });
    } catch (err) {
      setError("Failed to fetch college statistics");
      console.error("Error fetching college stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={fetchCollegeStats}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Find the maximum count for scaling
  const maxCount = Math.max(...collegeData.map((item) => item.students));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          College Registration Statistics
        </h3>
        <div className="flex gap-6 text-sm text-gray-600">
          <div>
            <span className="font-medium">Total Colleges: </span>
            <span className="text-blue-600 font-bold">
              {totalStats.totalColleges}
            </span>
          </div>
          <div>
            <span className="font-medium">Total Students: </span>
            <span className="text-green-600 font-bold">
              {totalStats.totalStudents}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {collegeData.map((college, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-32 text-sm font-medium text-gray-700 truncate">
              {college.college}
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(college.students / maxCount) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white drop-shadow-sm">
                    {college.students}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-16 text-right text-sm font-semibold text-gray-700">
              {college.students}
            </div>
          </div>
        ))}
      </div>

      {collegeData.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No college data available</p>
        </div>
      )}
    </div>
  );
};

export default CollegeStats;
