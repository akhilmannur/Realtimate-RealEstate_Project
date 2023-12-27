import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Navbar,
  Button,
  IconButton,
  Collapse,
  Avatar,
  Textarea,
} from "@material-tailwind/react";
import { LinkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import ChatContainer from "../Pages/ChatContainer";

const ChatShowArea = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div>
      <Card className="min-h-[35rem] sm:min-h-[35rem] w-[15rem] md:w-[50rem] relative rounded-none">
        <Navbar className="max-w-10xl p-3 bg-blue-gray-100 w-full relative rounded-none shadow-none h-18">
          <div className="container  flex items-center justify-between text-blue-gray-900 w-full">
            <div className="flex items-center mx-8">
              <Avatar
                src="https://cdn2.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.jpg"
                alt="avatar"
                className="h-8 w-8"
              />
            </div>
            <div className="flex items-center gap-x-1">
              <PhoneIcon className="h-5 w-5 hidden lg:inline-block" />
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
          <Collapse open={openNav}>
            <div className="container mx-auto">
              <div className="flex items-center">
                <Button fullWidth variant="gradient" size="sm" className="">
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </Collapse>
        </Navbar>

        <CardBody className="flex-grow bg-gray-300 ">
        <ChatContainer/>
        </CardBody>

        <div className="flex  flex-row items-center gap-2 w-full border border-gray-900/10 bg-gray-900/5 p-2">
          <div className="flex">
            <IconButton variant="text" className="rounded-full lg:inline hidden sm:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </IconButton>
            <IconButton variant="text" className="rounded-full lg:inline hidden sm:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
            </IconButton>
          </div>
          <Textarea
            rows={1}
            resize={true}
            placeholder="Your Message"
            className="min-h-full !border-0 focus:border-transparent"
            containerProps={{
              className: "grid h-full",
            }}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <div className="flex items-center ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatShowArea;
