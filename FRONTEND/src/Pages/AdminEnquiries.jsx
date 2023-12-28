import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { TrashIcon, } from "@heroicons/react/24/solid";

const AdminEnquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userMessages, setUserMessages] = useState({});

  const handleOpen = (id) => setOpen((cur) => !cur);

  const handleOpenUser = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/contact/${userId}/getUserMessages`
      );

      setUserMessages(res.data.userMessages);
    } catch (error) {
      toast.error("Error fetching user messages:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/contact/${userMessages._id}/markAsRead`
      );
      setUserMessages({ ...userMessages, isRead: true });
    } catch (error) {
      toast.error("Error marking message as read:", error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/contact/getallmessage"
        );

        setContacts(response.data.allContact);
      } catch (error) {
        toast.error("error");
      }
    };

    if (contacts.length === 0) {
      fetchContacts();
    }
  }, [contacts]);


  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:3000/api/contact/${messageId}/deleteMessage`);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== messageId));
      toast.success('Message deleted successfully');
    } catch (error) {
      toast.error('Error deleting message:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Enquiries</h1>
      <div className="flex gap-4 flex-wrap">
        {contacts.map((contact) => (
          <div
            className="bg-white shadow-md rounded-md p-4 flex sm:flex-row flex-col gap-2"
            key={contact._id}
          >
            <img
              src={contact.userRef.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mb-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{contact.userRef.name}</h3>
              <h3 className="text-lg font-semibold">
                Type of Enquiry:{contact.enquiryType}
              </h3>
              <button
                className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-md mt-4"
                onClick={() => {
                  handleOpenUser(contact._id);
                  handleOpen(contact._id);
                }}
              >
                View Enquiry
              </button>
              {contact.isRead === true ? (
                <Typography color="blue-gray" variant="body">
                  Marked as Read
                </Typography>
              ) : null}
            </div>
            <div>
              <button >
              <TrashIcon
                  className="h-5 w-5 text-blue-gray-500"
                  onClick={() => handleDeleteMessage(contact._id)}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              User Enquries
            </Typography>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="overflow-y-scroll !px-5">
          <div className="mb-6">
            <ul className="mt-3 -ml-2 flex flex-col gap-1">
              <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md">
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                  name:{userMessages?.firstName}
                </Typography>
              </MenuItem>
              <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md">
                <Typography color="blue-gray" variant="h6">
                  email:{userMessages?.email}
                </Typography>
              </MenuItem>
            </ul>
          </div>
          <div>
            <ul className="mt-4 -ml-2.5 flex flex-col gap-1">
              <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md">
                <Typography
                  className="uppsecase"
                  color="blue-gray"
                  variant="h6"
                >
                  Phone Number: {userMessages?.phoneNumber}
                </Typography>
              </MenuItem>
              <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md">
                <Typography
                  className="uppsecase"
                  color="blue-gray"
                  variant="h6"
                >
                  Message:{userMessages?.message}
                </Typography>
              </MenuItem>
            </ul>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between gap-2">
          {!userMessages.isRead ? (
            <Button variant="outlined" size="sm" onClick={markAsRead}>
              Mark as Read
            </Button>
          ) : (
            <Typography color="blue-gray" variant="body">
              Marked as Read
            </Typography>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AdminEnquiries;
