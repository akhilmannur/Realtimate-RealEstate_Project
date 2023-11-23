import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import ListingimageUrls from "./ListingimageUrls";

const Createlist = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    ListingimageUrls: [],
  });
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleImageUpload = (e) => {
    if (
      files.length > 0 &&
      files.length + formData.ListingimageUrls.length < 7
    ) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(ListingimageUrls(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            ListingimageUrls: formData.ListingimageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed ");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      ListingimageUrls: formData.ListingimageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <div className=" py-4 px-8 overflow-y-auto max-h-screen">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step className="h-4 w-4" onClick={() => setActiveStep(0)} />
        <Step className="h-4 w-4" onClick={() => setActiveStep(1)} />
        <Step className="h-4 w-4" onClick={() => setActiveStep(2)} />
      </Stepper>
      <form>
        {activeStep === 0 && (
          <div>
            <div className=" max-w-3xl ">
              <h1 className="text-4xl font-semibold my-7 ml-3">
                Sell or Rent Your Property
              </h1>
              <h4 className="text-xl font-semibold mx-3 ">
                you are posting the property for{" "}
                <span>
                  <p className="inline-block bg-yellow-800 px-2 rounded">
                    free
                  </p>
                </span>
              </h4>
              <h1 className="text-xl font-semibold mx-3 my-3">
                personal details
              </h1>
              <div className="flex flex-col sm:flex-row my-5 mx-auto">
                <div className="flex  flex-col gap-4 flex-1">
                  <input
                    type="text"
                    placeholder="Name"
                    className="border p-3 rounded-lg "
                    id="name"
                    maxLength="62"
                    minLength="10"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="phonenumber"
                    required
                  />
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="border p-3 rounded-lg "
                    id="description"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Adress"
                    className="border p-3 rounded-lg "
                    id="adress"
                    required
                  />
                </div>
              </div>
               <div className="flex justify-between">
                    <Button onClick={handlePrev} disabled={activeStep === 0}>
                      Prev
                    </Button>
                    {activeStep === 2 ? (
                      <Button disabled={activeStep === 0}>
                        Create Listing
                      </Button>
                    ) : null}
                    <Button
                      type="submit"
                      onClick={handleNext}
                      disabled={activeStep === 2}
                    >
                      Next
                    </Button>
                  </div>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <div className=" max-w-3xl ">
              <h1 className="text-4xl font-semibold my-7 ml-3">
                Sell or Rent Your Property
              </h1>
              <h4 className="text-xl font-semibold mx-3 ">
                you are posting the property for{" "}
                <span>
                  <p className="inline-block bg-yellow-800 px-2 rounded">
                    free
                  </p>
                </span>
              </h4>
              <h1 className="text-xl font-semibold mx-3 my-3">
                Type and facilities
              </h1>

              <div className="flex gap-6 flex-wrap flex-1 ">
                <div className="flex gap-2 mx-3">
                  <input type="checkbox" id="sell" className="w-5 " />
                  <span>Sell</span>
                </div>
                <div className="flex gap-2 mx-3">
                  <input type="checkbox" id="rent" className="w-5 " />
                  <span>Rent</span>
                </div>
                <div className="flex gap-2 mx-3">
                  <input type="checkbox" id="parking" className="w-5 " />
                  <span>Parking Spot</span>
                </div>
                <div className="flex gap-2 mx-3">
                  <input type="checkbox" id="othe" className="w-5 " />
                  <span>Others</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 my-4">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="bedrooms"
                    min="1"
                    max="10"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <p>Beds</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="bathrooms"
                    min="1"
                    max="10"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <p>Baths</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="regularPrice"
                    min="50"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <div className="flex flex-col items-center">
                    <p>Regular price</p>
                    <span className="text-xs">(RS/month)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountprice"
                    min="50"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <div className="flex flex-col items-center">
                    <p>Discount price</p>
                    <span className="text-xs">(RS/month)</span>
                  </div>
                  </div>
                   <div className="flex justify-between gap-4">
                    <Button onClick={handlePrev} disabled={activeStep === 0}>
                      Prev
                    </Button>
                    {activeStep === 2 ? (
                      <Button disabled={activeStep === 0}>
                        Create Listing
                      </Button>
                    ) : null}
                    <Button
                      type="submit"
                      onClick={handleNext}
                      disabled={activeStep === 2}
                    >
                      Next
                    </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div className="max-w-6xl">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 max-w-3xl">
                <h1 className="text-4xl font-semibold my-7 ml-3">
                  Sell or Rent Your Property
                </h1>
                <h4 className="text-xl font-semibold mx-3">
                  You are posting the property for{" "}
                  <span>
                    <p className="inline-block bg-yellow-800 px-2 rounded">
                      free
                    </p>
                  </span>
                </h4>
                <h1 className="text-xl font-semibold mx-3 my-3">
                  Upload your images
                </h1>
                <div className="mx-3 my-3 flex flex-col flex-1 gap-4">
                  <p className="font-semibold">
                    Images:
                    <span className="font-normal text-gray-600 ml-2">
                      The first image will be the cover (max 6)
                    </span>
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="border border-gray-300 p-5 rounded-lg"
                    onChange={(e) => {
                      setFiles(e.target.files);
                    }}
                  />
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={handleImageUpload}
                    className="bg-black text-white rounded-lg p-3 mx-2"
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                  <div className="flex justify-between">
                    <Button onClick={handlePrev} disabled={activeStep === 0}>
                      Prev
                    </Button>
                    {activeStep === 2 ? (
                      <Button disabled={activeStep === 0}>
                        Create Listing
                      </Button>
                    ) : null}
                    <Button
                      type="submit"
                      onClick={handleNext}
                      disabled={activeStep === 2}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 flex flex-col justify-end gap-4">
                {formData.ListingimageUrls.length > 0 &&
                  formData.ListingimageUrls.map((url, index) => (
                    <div
                      key={url}
                      className="flex justify-between p-3 border items-center"
                    >
                      <img
                        src={url}
                        alt="listing image"
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Createlist;
