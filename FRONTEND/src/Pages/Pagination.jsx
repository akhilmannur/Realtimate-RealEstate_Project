// import React from "react";
// import { Button, IconButton } from "@material-tailwind/react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
// export default function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
//   const [active, setActive] = React.useState(1);
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

 
 
//   const getItemProps = (index) =>
//     ({
//       variant: active === index ? "filled" : "text",
//       color: "gray",
//       onClick: () => setActive(index),
//       className: "rounded-full",
//     } );
 
//   const next = () => {
//     if (active === 5) return;
 
//     setActive(active + 1);
//     if (currentPage === pageNumbers.length) return;
//     paginate(currentPage + 1);
    
//   };
 
//   const prev = () => {
//     if (active === 1) return;
 
//     setActive(active - 1);
//     if (currentPage === 1) return;
//     paginate(currentPage - 1);
//   };
 
//   return (
//     <div className="flex items-center gap-4">
//       <Button
//         variant="text"
//         className="flex items-center gap-2 rounded-full"
//         onClick={prev}
//         disabled={active === 1}
//       >
//         <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
//       </Button>
//       <div className="flex items-center gap-2">
//         <IconButton {...getItemProps(1)}>1</IconButton>
//         <IconButton {...getItemProps(2)}>2</IconButton>
//         <IconButton {...getItemProps(3)}>3</IconButton>
//         <IconButton {...getItemProps(4)}>4</IconButton>
//         <IconButton {...getItemProps(5)}>5</IconButton>
//       </div>
//       <Button
//         variant="text"
//         className="flex items-center gap-2 rounded-full"
//         onClick={next}
//         disabled={active === 5}
//       >
//         Next
//         <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const next = () => {
    if (currentPage === pageNumbers.length) return;
    paginate(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    paginate(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> 
      </Button>
      <div className="flex items-center gap-2">
        {pageNumbers.map((number) => (
          <IconButton
            key={number}
            variant={currentPage === number ? "filled" : "text"}
            color="gray"
            onClick={() => paginate(number)}
            className="rounded-full"
          >
            {number}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={currentPage === pageNumbers.length}
      >
      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
