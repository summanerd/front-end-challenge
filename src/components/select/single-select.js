import React from 'react';
import PropTypes from 'prop-types';
import { getSelectComponent } from './select';

const Select = getSelectComponent();

export function SingleSelect(props) {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Select {...props} />
  );
}

SingleSelect.defaultProps = {
  defaultLabel: 'All Items',
  pluralLabel: 'Items',
  selectedValues: [],
};

SingleSelect.propTypes = {
  defaultLabel: PropTypes.string,
  pluralLabel: PropTypes.string,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};
