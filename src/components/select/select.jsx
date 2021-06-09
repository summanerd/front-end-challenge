import React from 'react';
import PropTypes from 'prop-types';
import * as selectHelper from './select-helper';
import { SelectLabel } from './select-label';
import { SelectOption } from './select-option';

function noop() {}

export function getSelectComponent(componentOptions = {}) {
  const {
    onSelectOption = selectHelper.onSelectOption,
    onToggleOpen = selectHelper.onToggleOpen,
    onToggleClose = selectHelper.onToggleClose,
    getSelectedOptions = selectHelper.getSelectedOptions,
    getDefaultClasses = selectHelper.getDefaultClasses,
  } = componentOptions;

  class Select extends React.Component {
    toggleDropDown = function selectToggleDropDown() {
      const { isOpen } = this.state;

      this.setState({ isOpen: !isOpen });
      this[isOpen ? 'onToggleOpen' : 'onToggleClose']();
    }.bind(this);

    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
        selected: getSelectedOptions(props.options, props.selectedValues),
      };

      this.classes = getDefaultClasses();
    }

    onSelectOption = onSelectOption.bind(this);

    onToggleOpen = onToggleOpen.bind(this);

    onToggleClose = onToggleClose.bind(this);

    get label() {
      const { selected } = this.state;
      const { defaultLabel, pluralLabel } = this.props;

      if (!selected.length) {
        return defaultLabel;
      }

      if (selected.length === 1) {
        return selected[0].label;
      }

      return `${selected.length} ${pluralLabel}`;
    }

    get selectedValues() {
      const { selected } = this.state;
      return selected.map((option) => option.value);
    }

    sendChangeNotification() {
      const { onChange } = this.props;
      onChange(this.selectedValues);
    }

    render() {
      const { options } = this.props;
      const { isOpen } = this.state;
      const { toggleClasses, labelClasses, optionClasses } = this.classes;
      const selectClasses = this.classes.selectClasses.slice();
      const optionsClasses = this.classes.optionsClasses.slice();

      if (isOpen) {
        selectClasses.push('select--is-open');
        optionsClasses.push('select__options--is-open');
      }

      return (
        <div
          className={selectClasses.join(' ')}
          data-state={isOpen ? 'open' : 'closed'}
          data-component="select"
          ref={(el) => { this.selectNode = el; }}
        >
          <button
            type="button"
            className={toggleClasses.join(' ')}
            data-action="toggle"
            onClick={(ev) => {
              ev.preventDefault();
              this.toggleDropDown();
            }}
          >
            <SelectLabel label={this.label} classes={labelClasses} />
          </button>
          <ul className={optionsClasses.join(' ')} data-region="select-options">
            {
              options.map((option) => (
                <SelectOption
                  key={`select-${option.value}`}
                  option={option}
                  selectedValues={this.selectedValues}
                  onSelect={this.onSelectOption}
                  classes={optionClasses}
                />
              ))
            }
          </ul>
        </div>
      );
    }
  }

  Select.defaultProps = {
    defaultLabel: 'All Items',
    pluralLabel: 'Items',
    selectedValues: [],
    onChange: noop,
  };

  Select.propTypes = {
    defaultLabel: PropTypes.string,
    pluralLabel: PropTypes.string,
    selectedValues: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })).isRequired,
    onChange: PropTypes.func,
  };

  return Select;
}
