import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { App } from '../src/app';

chai.use(chaiEnzyme());

describe('Product Page', () => {
  describe('When Page loads', () => {
    let SUT;
    beforeEach('mount app', () => {
      SUT = shallow(<App />);
    });

    it('should display price as $35.00', () => {
      expect(SUT.find('[data-prop="price"]').text()).to.match(/\$35.00/);
    });

    it('should display size as unspecified', () => {
      expect(SUT.find('[data-prop="size"]').text()).to.match(/Size:--/);
    });

    it('should display color as black', () => {
      expect(SUT.find('[data-prop="color"]').text()).to.match(/Color:black/);
    });

    it('should display quantity as 0', () => {
      expect(SUT.find('[data-prop="quantity"]').text()).to.match(/Quantity:0/);
    });
  });
});
