import React from 'react';
import { ProductSlides } from './components/product-slides/product-slides';
import { ProductSummary } from './components/product-summary/product-summary';
import { ProductDetails } from './components/product-details/product-details';
import { ProductImageZoom } from './components/product-image-zoom/product-image-zoom';
import translations from './translations.json';
import img2 from './assets/top section images/highwaist_black_front_1024x1024 (1).jpg';
import img1 from './assets/top section images/highwaist_black_front_2_1024x1024.jpg';
import img3 from './assets/top section images/highwaist_black_front_3_1024x1024.jpg';
import img4 from './assets/top section images/highwaist_black_front_4_1024x1024.jpg';
import img5 from './assets/top section images/highwaist_black_side_1024x1024.jpg';
import img6 from './assets/top section images/highwaist_black_back_1024x1024.jpg';
import bottomImg1 from './assets/bottom section images/thinx_productpage_-03.jpg';
import bottomImg2 from './assets/bottom section images/thinx_productpage_-04.jpg';
import bottomImg3 from './assets/bottom section images/thinx_productpage_-05.jpg';
import bottomImg4 from './assets/bottom section images/thinx_productpage_-07.jpg';
import bottomImg5 from './assets/bottom section images/thinx_productpage_-08.jpg';
import './styles.scss';

function getStore() {
  let color = 'black';
  let size;
  let quantity = 0;
  let zoomIndex = 0;
  let onZoomIndex;
  const price = 35;

  return {
    get images() {
      return [
        { src: img1, description: 'highwaist front view' },
        { src: img2, description: 'highwaist front view' },
        { src: img3, description: 'highwaist front view' },
        { src: img4, description: 'highwaist front view' },
        { src: img5, description: 'highwaist front view' },
        { src: img6, description: 'highwaist front view' },
      ];
    },
    get colorOptions() {
      return [
        { value: 'black', label: translations.black, modifier: 'black' },
        { value: 'beige', label: translations.beige, modifier: 'beige' },
      ];
    },
    get sizeOptions() {
      return [
        { value: 'XS', label: translations.xsmall },
        { value: 'S', label: translations.small },
        { value: 'M', label: translations.medium },
        { value: 'L', label: translations.large },
        { value: 'XL', label: translations.xlarge },
        { value: 'XXL', label: translations.xxlarge },
      ];
    },
    get size() {
      return size;
    },
    get color() {
      return color;
    },
    get quantity() {
      return quantity;
    },
    get zoomIndex() {
      return zoomIndex;
    },
    get translations() {
      return translations;
    },
    set onZoomIndex(handler) {
      onZoomIndex = handler;
    },
    onAddToCart() {
      console.log(`adding ${quantity} product(s) size: ${size}, color: ${color} at ${price} each`);
    },
    updateQuantity(newQuantity) {
      quantity = newQuantity;
    },
    updateSize(newSize) {
      size = newSize;
    },
    updateColor(newColor) {
      color = newColor;
    },
    updateZoomIndex(newZoomIndex) {
      zoomIndex = newZoomIndex;
      if (onZoomIndex) {
        onZoomIndex();
      }
    },
    getState() {
      return {
        size,
        color,
        quantity,
        canAddToCart: !!size && quantity > 0,
        formattedPrice: price.toFixed(2),
      };
    },
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = getStore();
    this.state = {
      activeIndex: 0,
      showZoom: false,
    };
    this.showImageZoom = this.showImageZoom.bind(this);
    this.closeImageZoom = this.closeImageZoom.bind(this);
  }

  showImageZoom(activeIndex) {
    this.store.updateZoomIndex(activeIndex);
    this.setState({ activeIndex, showZoom: true });
  }

  closeImageZoom() {
    this.setState({ showZoom: false });
  }

  render() {
    const { images } = this.store;
    const { activeIndex, showZoom } = this.state;
    return (
      <main>
        <ProductImageZoom
          images={images}
          activeIndex={activeIndex}
          isShowing={showZoom}
          onClose={this.closeImageZoom}
        />
        <section className="section-container">
          <div className="top-container">
            <div className="hide-for-small top-container-sticky-column">
              <div className="fixed-columns">
                <h1 className="text-upper-case mb-4">{translations.productHeader}</h1>
                <p>{translations.productDescription1}</p>
                <p>{translations.productDescription2}</p>
              </div>
            </div>
            <div className="top-container-center-column">
              <ProductSlides images={images} productDescription="Thinx underwear" onSelect={this.showImageZoom} />
            </div>
            <div className="top-container-sticky-column">
              <div className="fixed-columns">
                <div className="hide-for-large mb-6">
                  <h1 className="text-upper-case mb-4">{translations.productHeader}</h1>
                  <p>{translations.productDescription1}</p>
                  <p>{translations.productDescription2}</p>
                </div>
                <ProductDetails store={this.store} />
              </div>
            </div>
          </div>
        </section>
        <section className="section-container">
          <div className="product-row-double product-row">
            <ProductSummary
              src={bottomImg2}
              description={translations.product3Description}
              caption={translations.product3Caption}
              title={translations.product3Title}
              modifier="horizontal"
            />
            <ProductSummary
              src={bottomImg1}
              description={translations.product2Description}
              caption={translations.product2Caption}
              title={translations.product2Title}
              modifier="vertical"
            />
          </div>
          <div className="product-row-single product-row">
            <ProductSummary
              src={bottomImg3}
              description={translations.product4Description}
              caption={translations.product4Caption}
              title={translations.product4Title}
              modifier="horizontal"
            />
          </div>
          <div className="product-row-double product-row">
            <ProductSummary
              src={bottomImg4}
              description={translations.product5Description}
              caption={translations.product5Caption}
              title={translations.product5Title}
              modifier="horizontal"
            />
            <ProductSummary
              src={bottomImg5}
              description={translations.product6Description}
              caption={translations.product6Caption}
              title={translations.product6Title}
              modifier="vertical"
            />
          </div>
        </section>
      </main>
    );
  }
}

export { App };
