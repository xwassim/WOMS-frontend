import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackArrow = ({ path }) => {
  return (
    <Link
      to={path}
      className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
    >
      <FiArrowLeft className="mr-1" />
      <span>Retour</span>
    </Link>
  );
};

export default BackArrow;
