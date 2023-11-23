
import axios from "axios";

const ListingimageUrls= async (file) => {
  const data = new FormData();
  data.append("file", file);
  console.log(file);
  data.append("upload_preset", "ListingimageUrls");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dstfms4d6/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (res.status === 200) {
      console.log("Upload successful:", res.data.url);
      return res.data.url;
    } else {
      console.error("Upload failed. Response:", res);
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
  
  
};

export default ListingimageUrls;