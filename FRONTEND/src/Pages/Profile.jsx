import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentuser } = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(currentuser?.username || '');
  const [email, setEmail] = useState(currentuser?.email || '');
  const [password, setPassword] = useState('');

  const avatarUrl = currentuser?.rest?.avatar;

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);

  };

  return (
    <div className='p-3 max-w-md mx-auto bg-white border  shadow-2xl mt-20 rounded-lg'>
      <h1 className='text-4xl font-bold text-center my-7'>PROFILE</h1>
      <form className="flex flex-col">  
        <img
          className="w-24 h-24 mb-4 rounded-full object-cover cursor-pointer self-center mt-2"
          src={avatarUrl}
          alt="profile image"
        />
        {editing ? (
          <>
            <input
              type="text"
              placeholder="username"
              id="username"
              className="border p-3 rounded-lg center m-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              id="email"
              className="border p-3 rounded-lg center m-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              className="border p-3 rounded-lg center m-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : (
          <div className="flex flex-col items-start space-y-2">
            <h3 className="bg-gray-100 p-3 rounded-lg text-lg w-full">
              <strong>Username:</strong> {currentuser?.rest?.username}
            </h3>
            <h3 className="bg-gray-100 p-3 rounded-lg text-lg w-full">
              <strong>Email:</strong> {currentuser?.rest?.email}
            </h3>
            <h3 className="bg-gray-100 p-3 rounded-lg text-lg w-full">
              <strong>Password:</strong> ********
            </h3>
          </div>
        )}
        <div >
          {editing ? (
            <a
              href="#"
              className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-80"
              onClick={handleSaveClick}
            >
              Save
            </a>
          ) : (
            <div className="flex justify-between items-center p-4">
            <a
              href="#"
              className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-80"
              onClick={handleEditClick}
            >
              Edit
            </a>
            <a
            href="#"
            className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-80"
         
          >
          Delete Account
          </a>
            <a
            href="#"
            className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-80"
         
          >
          signout
          </a>
          </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;


