import React from "react";

export const SortBy = ({ sortValue, onSortChange }) => {
    
  const handleChange = (e) => {
    if (onSortChange) {
      onSortChange(e.target.value);
    }
  };

  return (
    <div>
      <select id="filter-items" value={sortValue} onChange={handleChange}>
        <option value="">Default</option>
        <option value="price_low_to_high">Price, Low to High</option>
        <option value="price_high_to_low">Price, High to Low</option>
        <option value="likes_high_to_low">Most liked</option>
      </select>
    </div>
  );
};
