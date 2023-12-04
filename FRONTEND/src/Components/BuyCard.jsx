import {
  Card,
  CardHeader,
  CardBody,
  Typography,
 
} from "@material-tailwind/react";

const BuyCard = () => {
  return (
    <div className="flex flex justify-center mt-0">
      <Card
        shadow={false}
        className="relative grid h-[16rem] w-full max-w-[38rem] items-end justify-center overflow-hidden text-center"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://okcredit-blog-images-prod.storage.googleapis.com/2020/12/realestate1.jpg')] bg-cover bg-center"
        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12">
          <Typography
            variant="h2"
            color="white"
            className="mb-6 font-medium leading-[1.5]"
          >
            We are with you to make show intreasting properties first
          </Typography>
          {/* <Typography variant="h5" className="mb-4 text-gray-400">
          Tania Andrew
        </Typography>
        <Avatar
          size="xl"
          variant="circular"
          alt="tania andrew"
          className="border-2 border-white"
          src=""
        /> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default BuyCard;
