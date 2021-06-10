import React from 'react';
import PropTypes from 'prop-types';
import { ProductImage } from '../product-image/product-image';

function CloseButton({ onClick }) {
  return (
    <button type="button" className="close-button" onClick={onClick}>
      <div className="close-button__left">
        <div className="close-button__right" />
      </div>
    </button>
  );
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export class ProductImageZoom extends React.Component {
  constructor(props) {
    super(props);
    this.blockName = 'product-image-zoom';
    this.container = React.createRef();
    this.state = {
      isShowing: props.isShowing,
    };
    this.close = this.close.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return { isShowing: props.isShowing };
  }

  componentDidUpdate() {
    if (this.container.current) {
      this.container.current.classList.add('is-active');
    }
  }

  fadeOut() {
    if (this.container.current) {
      this.container.current.classList.remove('is-active');
    }
  }

  close() {
    this.fadeOut();
    setTimeout(() => {
      const { onClose } = this.props;
      onClose();
    }, 500);
  }

  render() {
    const { images } = this.props;
    const { isShowing } = this.state;
    if (!isShowing) {
      return null;
    }
    return (
      <div className="product-image-zoom" ref={this.container}>
        <div className="product-image-zoom__header">
          <CloseButton onClick={this.close} />
        </div>
        {
          images.map(({ src, description }, index) => (
            <div id={`${this.blockName}-${index}`} className={`${this.blockName}__image`} key={`${this.blockName}-${src}`}>
              <ProductImage src={src} description={description} />
            </div>
          ))
        }
      </div>
    );
  }
}

ProductImageZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
  isShowing: PropTypes.bool.isRequired,
};
