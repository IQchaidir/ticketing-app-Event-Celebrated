const FilterButton = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none"
      onClick={onClick}
    >
      Filter
    </button>
  );
};

export default FilterButton;
