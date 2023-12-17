import { Avatar } from "@material-tailwind/react";
import React from "react";

const ChatContainer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center space-x-2">
        <div>
          <Avatar
            alt="Tailwind CSS chat bubble component"
            src="https://res.cloudinary.com/dstfms4d6/image/upload/v1700824578/Avatar/opedkwre15phg4w9c540.jpg"
          />
        </div>

        <div className="bg-white rounded-lg p-2 break-words max-w-[15rem]">hy Dundu</div>
      </div>

      <div className="flex justify-end items-center space-x-2">
      <div className="bg-white rounded-lg p-2 break-words max-w-[18rem] ">hy sundari</div>

      </div>
    </div>
  );
};

export default ChatContainer;

// import React from "react";

// const ChatContainer = () => {
//   return (
//     <div>
//       <div className="chat chat-start">
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               alt="Tailwind CSS chat bubble component"
//               src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//             />
//           </div>
//         </div>
//         <div className="chat-header">
//           Obi-Wan Kenobi
//           <time className="text-xs opacity-50">12:45</time>
//         </div>
//         <div className="chat-bubble">You were the Chosen One!</div>
//         <div className="chat-footer opacity-50">Delivered</div>
//       </div>
//       <div className="chat chat-end">
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               alt="Tailwind CSS chat bubble component"
//               src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//             />
//           </div>
//         </div>
//         <div className="chat-header">
//           Anakin
//           <time className="text-xs opacity-50">12:46</time>
//         </div>
//         <div className="chat-bubble">I hate you!</div>
//         <div className="chat-footer opacity-50">Seen at 12:46</div>
//       </div>
//     </div>
//   );
// };

// export default ChatContainer;
