import React from 'react';
import PropTypes from 'prop-types';
import { ProductImage } from '../product-image/product-image';

function ProductSlidePagination({ images, activeIndex, onSelect }) {
  return (
    <div className="product-slides-pagination">
      {
          images.map(({ description }, index) => {
            const classNames = ['product-slides-pagination__slide'];
            if (index === activeIndex) {
              classNames.push('is-active');
            }
            return (
              <button
                type="button"
                role="tab"
                className={classNames.join(' ')}
                aria-label={description}
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
    const { images, productDescription } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="product-slides" aria-label={productDescription}>
        {
        images.map(({ src, description }, index) => (
          <div className={`product-slide ${index === activeIndex ? 'is-active' : ''}`} key={`product-${src}`}>
            <ProductImage src={src} description={description} />
          </div>
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
};
