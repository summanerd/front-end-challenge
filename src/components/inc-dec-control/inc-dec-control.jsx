import React from 'react';
import PropTypes from 'prop-types';

export function IncDecControl({
  onAdjust, label, quantity, max,
}) {
  return (
    <div className="inc-dec-control product-control" aria-valuenow={quantity} aria-valuemin="0" aria-valuemax={max}>
      <button
        data-action="decrease"
        disabled={quantity === 0}
        aria-label="decrease by 1"
        aria-disabled={quantity === 0}
        onClick={() => onAdjust(-1)}
        type="button"
      >
        -
      </button>
      <div className="inc-dec-control__label">
        {label}
        &nbsp;(
        {quantity}
        )
      </div>
      <button
        data-action="increase"
        disabled={quantity === max}
        aria-label="increase by 1"
        aria-disabled={quantity === max}
        onClick={() => onAdjust(1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}

IncDecControl.propTypes = {
  onAdjust: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
