import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

/**
 * Reusable back navigation button.
 * Redirects the user to a specified route.
 *
 * @param {string} destination - Route to navigate back to
 */
function BackButton({ destination = "/tasks" }) {
  return (
    <div className="flex">
      <Link
        to={destination}
        aria-label="Go back"
        className="
          bg-sky-800 text-white px-4 py-2 rounded-lg w-fit
          hover:bg-sky-900 transition-colors
          focus:outline-none focus:ring-2 focus:ring-sky-500
        "
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
}

export default BackButton;
