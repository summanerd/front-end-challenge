import React from 'react';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { App } from '../src/app';

chai.use(chaiEnzyme());

describe('Product Page', () => {
  describe('When Page loads', () => {
    let SUT;
    beforeEach('mount app', () => {
      SUT = mount(<App />);
    });

    it('should display price as $35.00', () => {
      expect(SUT.find('[data-prop="price"]').text()).to.match(/\$35.00/);
    });

    it('should display size as unspecified', () => {
      expect(SUT.find('[data-prop="size"]').text()).to.match(/Size:--/);
    });

    it('should display color as black', () => {
      expect(SUT.find('ToggleControl').html()).to.match(/toggle-control__option--black\s+is-active/);
      expect(SUT.find('ToggleControl').html()).not.to.match(/toggle-control__option--beige\s+is-active/);
    });

    it('should display quantity as 0', () => {
      expect(SUT.find('IncDecControl').html()).to.match(/quantity\(0\)/);
    });

    it('should disable add to cart button', () => {
      expect(SUT.find('[data-action="add-to-cart"]').prop('disabled')).to.eq(true);
    });
  });
});
