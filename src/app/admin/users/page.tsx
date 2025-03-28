"use client";

import { useState, useEffect } from "react";
import { listUsers } from "@/lib/actions";

// Định nghĩa kiểu User
interface User {
  _id: string;
  username: string;
  role: "user" | "admin";
  createdAt: string;
}

export default function UserManagementDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Tải danh sách người dùng
  const fetchUsers = async (currentPage: number) => {
    setLoading(true);
    try {
      const result = await listUsers(currentPage);
      setUsers(result.users);
      setTotalPages(result.totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Không thể tải danh sách người dùng");
      setLoading(false);
    }
  };

  // Tải users khi component mount và khi thay đổi trang
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Hàm chuyển trang
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Render danh sách người dùng
  const renderUserTable = () => {
    if (loading) {
      return (
        <div className="text-center py-4">Đang tải danh sách người dùng...</div>
      );
    }

    if (error) {
      return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
    }

    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">STT</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Vai Trò</th>
              <th className="p-3 text-left">Ngày Tạo</th>
              <th className="p-3 text-left">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{(page - 1) * 10 + index + 1}</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">
                  <span
                    className={`
                    px-2 py-1 rounded text-xs 
                    ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }
                  `}
                  >
                    {user.role === "admin" ? "Quản Trị" : "Người Dùng"}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render phân trang
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`
            px-3 py-1 mx-1 rounded 
            ${
              page === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }
          `}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Trước
        </button>
        {pageNumbers}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quản Lý Người Dùng</h1>

      {renderUserTable()}

      {renderPagination()}
    </div>
  );
}
