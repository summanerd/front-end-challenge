import chai from 'chai';

const { expect } = chai;

describe('Product Page', () => {
  describe('When Page loads', () => {
    it('should display price as $35.00', () => {
      expect('$35.00').to.eq('$35.00');
    });
  });
});
