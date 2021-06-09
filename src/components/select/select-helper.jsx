function onSelectOption(option) {
  this.setState({ selected: [option] }, this.toggleDropDown);
}

function onClickOutsideOfSelect(event) {
  if (!this.selectNode) {
    return;
  }
  if (this.selectNode.contains(event.target)) {
    return;
  }
  delete this.removeBodyClickListener;
  this.toggleDropDown();
}

function onToggleOpen() {
  const listener = onClickOutsideOfSelect.bind(this);
  document.addEventListener('click', listener);
  this.removeBodyClickListener = () => document.removeEventListener('click', listener);
}

function onToggleClose() {
  if (this.removeBodyClickListener) {
    this.removeBodyClickListener();
    delete this.removeBodyClickListener;
  }

  this.sendChangeNotification();
}

function getSelectedOptions(options, selectedValues) {
  let i = 0;

  while (i < options.length) {
    const option = options[i];
    i += 1;
    if (selectedValues.indexOf(option.value) > -1) {
      return [option];
    }
  }

  return [];
}

function getDefaultClasses() {
  return {
    selectClasses: ['select'],
    toggleClasses: ['select__toggle'],
    labelClasses: ['select__label'],
    optionsClasses: ['select__options'],
    optionClasses: ['select__option'],
  };
}

export {
  onSelectOption,
  onToggleOpen,
  onToggleClose,
  getSelectedOptions,
  getDefaultClasses,
};
