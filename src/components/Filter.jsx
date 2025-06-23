const Filter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 w-fit">
      <label
        htmlFor="semester"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        🎓 Filter by Semester
      </label>
      <select
        name="semester"
        id="semester"
        onChange={handleChange}
        value={filters.semester}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700 bg-white hover:border-blue-300"
      >
        <option value=""  >
          All Semesters
        </option>
        {[...Array(7)].map((_, i) => (
          <option key={i} value={i + 1}>
            Semester {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
