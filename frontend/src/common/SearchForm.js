import React, { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div
      className="container mx-auto mt-8 p-4
      sm:px-6 lg:px-8"
    >
      <form
        className="bg-white p-4 sm:p-6
                               lg:p-8 rounded-lg shadow-md
                               flex flex-col sm:flex-row items-center
                               justify-center space-y-4 sm:space-y-0
                               sm:space-x-4"
        onSubmit={handleSubmit}
      >
        <div
          className="relative justify-center flex-grow
                                    w-full sm:w-1/2"
        >
          <input
            className="w-full py-3 px-4 bg-gray-100
              border border-blue-300 focus:ring-blue-500
              focus:border-blue-500 rounded-full
              text-gray-700 outline-none transition-colors
              duration-200 ease-in-out focus:ring-2
              focus:ring-blue-900 focus:bg-transparent
              focus:shadow-md"
            name="searchTerm"
            placeholder="Enter search term.."
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-amber-900 hover:bg-amber-600 focus:ring-2
                        focus:ring-blue-900 text-white font-semibold py-3 px-6
                        rounded-full transform hover:scale-105 transition-transform
                        focus:outline-none focus:ring-offset-2
                        focus:ring-offset-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
