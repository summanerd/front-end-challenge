import React from 'react';
import PropTypes from 'prop-types';

export function ToggleControl({
  onSelect, label, options, value,
}) {
  return (
    <div className="toggle-control">
      <div className="toggle-control__label">
        {label}
      </div>
      {
        options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={`toggle-${option.value}`}
              disabled={isActive}
              className={`toggle-control__option toggle-control__option--${option.modifier} ${isActive ? ' is-active' : ''}`}
              type="button"
              onClick={() => onSelect(option.value)}
            >
              {option.label}
              <span className="check" />
            </button>
          );
        })
      }
    </div>
  );
}

ToggleControl.propTypes = {
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string.isRequired,
};
