import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

const Createlist = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  return (
    <div className="w-full py-4 px-8">
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
                <div className="flex flex-col gap-4 flex-1">
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

              <div className="flex gap-6 flex-wrap">
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
              </div>
            </div>
          </div>
        )}
        {activeStep === 2 && (
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
                Upload your images
              </h1>
              <div className="mx-3 my-3">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="border border-gray-300 p-5 rounded-lg"
                />
                <button className="bg-black text-white rounded-lg p-3 mx-2">
                  upload
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-16 flex justify-between">
          <Button onClick={handlePrev} disabled={activeStep === 0}>
            Prev
          </Button>
          {activeStep == 2 ? (
            <Button onClick={handlePrev} disabled={activeStep === 0}>
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
      </form>
    </div>
  );
};

export default Createlist;
