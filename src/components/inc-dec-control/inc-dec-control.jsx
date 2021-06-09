import React from 'react';
import PropTypes from 'prop-types';

export function IncDecControl({
  onAdjust, label, quantity, max,
}) {
  return (
    <div className="inc-dec-control">
      <button data-action="decrease" disabled={quantity === 0} onClick={() => onAdjust(-1)} type="button">-</button>
      <div className="inc-dec-control__label">
        {label}
        (
        {quantity}
        )
      </div>
      <button data-action="increase" disabled={quantity === max} onClick={() => onAdjust(1)} type="button">+</button>
    </div>
  );
}

IncDecControl.propTypes = {
  onAdjust: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
