import React from 'react';
import './FilterDropdown.css'

const FilterDropdown = ({ filter, setFilter }) => {

  return (
    <div className='filter-container'>
        {/* Using for gives me error  */}
    {/* <label for ="filter">Filter Tasks:</label> */}
      <label htmlFor="filter">Filter Tasks: </label>
      <select
        id="filter"
        value={filter}
        className='filet-select'
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
