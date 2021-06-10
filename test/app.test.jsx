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

    describe('size dropdown', () => {
      it('should display default label \'size\'', () => {
        expect(SUT.find('SelectLabel').text()).to.eq('size');
      });

      it('should have 6 options in list', () => {
        expect(SUT.find('SelectOption')).to.have.lengthOf(6);
      });

      it('should not show options', () => {
        expect(SUT.find('[data-component="select"]').prop('data-state')).to.eq('closed');
      });
      describe('when toggle is clicked', () => {
        beforeEach(() => {
          SUT.find('[data-action="toggle"]').simulate('click');
        });

        it('should show options', () => {
          expect(SUT.find('[data-component="select"]').prop('data-state')).to.eq('open');
        });
      });
    });

    it('should display color as black', () => {
      expect(SUT.find('ToggleControl').html()).to.match(/toggle-control__option--black\s+is-active/);
      expect(SUT.find('ToggleControl').html()).not.to.match(/toggle-control__option--beige\s+is-active/);
    });

    it('should display quantity as 0', () => {
      expect(SUT.find('IncDecControl').html()).to.match(/quantity\&nbsp;\(0\)/);
    });

    it('should disable add to cart button', () => {
      expect(SUT.find('[data-action="add-to-cart"]').prop('disabled')).to.eq(true);
    });
  });
});
