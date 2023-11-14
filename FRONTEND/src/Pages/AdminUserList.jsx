import React from 'react';

const AdminUserList = () => {


  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-semibold mb-5">User Management</h1>

      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserList;
