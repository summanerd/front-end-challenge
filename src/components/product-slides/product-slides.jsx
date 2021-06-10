import React from 'react';
import PropTypes from 'prop-types';
import { ProductImage } from '../product-image/product-image';

function ProductSlidePagination({ images, activeIndex, onSelect }) {
  return (
    <div className="product-slides-pagination">
      {
          images.map(({ src, description }, index) => {
            const classNames = ['product-slides-pagination__slide'];
            if (index === activeIndex) {
              classNames.push('is-active');
            }
            return (
              <button
                type="button"
                role="tab"
                aria-current={index === activeIndex}
                key={`product-slide-${src}`}
                className={classNames.join(' ')}
                aria-label={`view image ${description}`}
                onClick={() => onSelect(index)}
              />
            );
          })
        }

    </div>
  );
}

ProductSlidePagination.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export class ProductSlides extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(newIndex) {
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { images, productDescription, onSelect } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="product-slides" role="region" aria-label={`images of ${productDescription}`}>
        {
        images.map(({ src, description }, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <button
            type="button"
            className={`product-slide ${index === activeIndex ? 'is-active' : ''}`}
            key={`product-${src}`}
            onClick={() => onSelect(index)}
          >
            <ProductImage src={src} description={description} detailId="product-details" />
          </button>
        ))
      }

        <ProductSlidePagination
          activeIndex={activeIndex}
          images={images}
          onSelect={this.updateIndex}
        />
      </div>
    );
  }
}

ProductSlides.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  productDescription: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
