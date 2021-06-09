import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable jsx-a11y/click-events-have-key-events */
function SelectOption({
  option, selectedValues, onSelect, classes,
}) {
  const isSelected = selectedValues.indexOf(option.value) > -1;
  const classNames = classes.slice();

  if (isSelected) {
    classNames.push('select__option--is-active');
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={classNames.join(' ')}
      data-select-value={option.value}
      data-action="select"
      onClick={() => onSelect(option)}
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="select__option-label" href="#" onClick={(ev) => ev.preventDefault()}>
        {option.label}
      </a>
    </li>
  );
}

SelectOption.defaultProps = {
  classes: [],
};

SelectOption.propTypes = {
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.arrayOf(PropTypes.string),
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  option: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }).isRequired,
};

export {
  SelectOption,
};
