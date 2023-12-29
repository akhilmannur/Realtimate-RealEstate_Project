import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { TEChart } from "tw-elements-react";
import axios from "axios";

const AdminDashbord = () => {
  const [userCounts, setUserCounts] = useState([]);
  const [listCounts, setListCounts] = useState([]);
  const [typeCounts, setTypeCounts] = useState({ sellCount: 0, rentCount: 0 });

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/usersjoinedpermonth"
        );
        const data = res.data;
        setUserCounts(data);
        fetchListingCount();
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };

    const fetchListingCount = async () => {
      try {
        const res = await axios.get(
          "/api/admin/listingpermonth"
        );
        const data = res.data;
        setListCounts(data);
        fetchTypesCount();
      } catch (error) {
        console.error("Error fetching listing count:", error);
      }
    };

    const fetchTypesCount = async () => {
      try {
        const res = await axios.get(
          "/api/admin/typecount"
        );
        const data = res.data;
        setTypeCounts(data);
      } catch (error) {
        console.error("Error fetching type count:", error);
      }
    };

    fetchUserCounts();
  }, []);

  const userCountData = userCounts.map((count) => count.count);
  const listCountData = listCounts.map((count) => count.count);
  const { sellCount, rentCount } = typeCounts;

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "users/month",
        data: userCountData,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  const chartConfigg = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Listing",
        data: listCountData,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const chartConfige = {
    type: "pie",
    width: 280,
    height: 280,
    series: [sellCount, rentCount],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      labels: ["Rent", "sale"],
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
    },
  };

  return (
    <div>
      <h1 className="font-bold sm:text-5xl text-2xl  text-center mt-10 mx-20">
        Welcome to AdminDashboard
      </h1>
      <div className="mt-5  flex sm:flex-row flex-col gap-4 sm:mx-20 mx-2">
        <div>
          <Card className="sm:w-[30rem] w-[19rem] ">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Line Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  User Activity Graph
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        <div>
          <Card className="sm:w-[30rem] w-[19rem] mt-4">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Bar Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Listing Trends
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...chartConfigg} />
            </CardBody>
          </Card>
        </div>
      </div>
<div>
      <Card className="sm:w-[30rem] w-[19rem] h-[22.5rem]">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Pie Chart
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              Category-wise Listing Distributio
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="grid place-items-center  h-[2rem] ">
          <Chart {...chartConfige} />
        </CardBody>
      </Card>
      <Card   className="sm:w-[30rem] w-[19rem] m:w-[30rem] w-[19rem] h-[28rem] mt-5">
      <TEChart
        type="radar"
        data={{
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday ",
          ],
          datasets: [
            {
              label: "Traffic",
              data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
            },
          ],
        }}
      /></Card>
    </div>
        </div>

    </div>
  );
};

export default AdminDashbord;
