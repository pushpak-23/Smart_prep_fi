import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 dark:text-whiteBg2 text-gray-800">
      <div>
        <h1 className="w-full text-3xl font-bold text-purple-500">
          Smart Prep
        </h1>
        <p className="py-4 text-textB dark:text-textW">
          Uncover your strengths and weaknesses with our comprehensive
          dashboard. It provides insightful metrics that go beyond just a score.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-medium text-gray-600 dark:text-textW">
            Solutions
          </h6>
          <ul>
            <li className="py-2 text-sm">Analytics</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-600 dark:text-textW">Support</h6>
          <ul>
            <li className="py-2 text-sm">Documentation</li>
            <li className="py-2 text-sm">Guides</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-600 dark:text-textW">College</h6>
          <ul>
            <li className="py-2 text-sm">About</li>
            <li className="py-2 text-sm">Blog</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-600 dark:text-textW">Legal</h6>
          <ul>
            <li className="py-2 text-sm">Claim</li>
            <li className="py-2 text-sm">Policy</li>
            <li className="py-2 text-sm">Terms</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
