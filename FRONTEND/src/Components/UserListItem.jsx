import React from "react";
import { useSelector } from "react-redux";

const UserListItem = ({handleFunction}) => {
  const { currentuser } = useSelector((state) => state.user);
  return (
    <div onClick={handleFunction}>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <img
              src={currentuser?.rest?.Reactavatar}
              alt="user avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="text-lg font-medium">{currentuser?.rest?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
