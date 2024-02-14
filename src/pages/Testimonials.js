import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const testimonials = [
  {
    id: 1,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "John Doe",
    position: "Software Engineer",
  },
  {
    id: 2,
    quote: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    author: "Jane Smith",
    position: "UX Designer",
  },
  {
    id: 3,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "shubman Doe",
    position: "Software Engineer",
  },
  {
    id: 4,
    quote: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    author: "virat Smith",
    position: "UX Designer",
  },
  {
    id: 5,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "rohit Doe",
    position: "Software Engineer",
  },
  {
    id: 6,
    quote: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    author: "rahul Smith",
    position: "UX Designer",
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0">
      <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
      
    </div>
  );
};

export default Testimonials;
