import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-1">
      <p className="text-center mt-1">
        Job Portal - 2023-2024, All Rights Reserved
        <Link
          className="ml-4"
          rel="noreferrer"
          target="_blank"
          href="https://github.com/cseshahriar"
        >
          @cseshahriar
        </Link>
      </p>
    </footer>
  );
};

export default Footer;