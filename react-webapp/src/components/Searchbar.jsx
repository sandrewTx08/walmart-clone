import { FiSearch } from "react-icons/fi";

export default function () {
  return (
    <div className="searchbar">
      <input type="text" placeholder="Type to search" />
      <button>
        <FiSearch />
      </button>
    </div>
  );
}
