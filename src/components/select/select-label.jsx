import React from 'react';
import PropTypes from 'prop-types';

function SelectLabel({ label, classes }) {
  return (
    <div className={classes.join(' ')} data-prop="label">
      {label}
      <span className="arrow" />
    </div>
  );
}

SelectLabel.defaultProps = {
  classes: [],
};

SelectLabel.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.arrayOf(PropTypes.string),
};

export {
  SelectLabel,
};
