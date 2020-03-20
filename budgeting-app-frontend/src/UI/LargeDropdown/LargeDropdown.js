import React from "react";

const LargeDropdown = () => {
  return (
    <div class="btn-group">
      <button
        class="btn btn-secondary btn-sm dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Large button
      </button>
      <div class="dropdown-menu">...</div>
    </div>
  );
};

export default LargeDropdown;
