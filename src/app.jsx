import React from 'react';
import { ProductSlides } from './components/product-slides/product-slides';
import { ProductSummary } from './components/product-summary/product-summary';
import translations from './translations.json';
import img1 from './assets/top section images/highwaist_black_front_1024x1024 (1).jpg';
import img2 from './assets/top section images/highwaist_black_front_2_1024x1024.jpg';
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
    get size() {
      return size;
    },
    get color() {
      return color;
    },
    get quantity() {
      return quantity;
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
    getState() {
      return {
        size,
        color,
        quantity,
        formattedPrice: price.toFixed(2),
      };
    },
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = getStore();
    this.state = this.store.getState();
  }

  updateState() {
    this.setState(this.store.getState());
  }

  render() {
    const {
      size, color, quantity, formattedPrice,
    } = this.state;
    const { onAddToCart, images } = this.store;
    return (
      <main>
        <section className="section-container">
          <div className="top-container">
            <div className="hide-for-small top-container-sticky-column">
              <div className="fixed-columns">
                <p className="text-upper-case">{translations.productHeader}</p>
                <p>{translations.productDescription1}</p>
                <p>{translations.productDescription2}</p>
              </div>
            </div>
            <div className="top-container-center-column">
              <ProductSlides images={images} productDescription="Thinx underwear" />
            </div>
            <div className="top-container-sticky-column">
              <div className="fixed-columns">
                <div className="hide-for-large">
                  <p className="text-upper-case">{translations.productHeader}</p>
                  <p>{translations.productDescription1}</p>
                  <p>{translations.productDescription2}</p>
                </div>
                <div data-prop="price">
                  Price:
                  $
                  {formattedPrice}
                </div>
                <div data-prop="color">
                  Color:
                  {color}
                </div>
                <div data-prop="quantity">
                  Quantity:
                  {quantity}
                </div>
                <div data-prop="size">
                  Size:
                  {size || '--'}
                </div>
                <div><button data-action="add-to-cart" type="submit" onClick={onAddToCart}>Add to Cart</button></div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-container">
          <div className="product-row-double">
            <ProductSummary
              src={bottomImg1}
              description={translations.product2Description}
              caption={translations.product2Caption}
              title={translations.product2Title}
            />
            <ProductSummary
              src={bottomImg2}
              description={translations.product3Description}
              caption={translations.product3Caption}
              title={translations.product3Title}
            />
          </div>
          <div className="product-row-single">
            <ProductSummary
              src={bottomImg3}
              description={translations.product4Description}
              caption={translations.product4Caption}
              title={translations.product4Title}
            />
          </div>
          <div className="product-row-double">
            <ProductSummary
              src={bottomImg4}
              description={translations.product5Description}
              caption={translations.product5Caption}
              title={translations.product5Title}
            />
            <ProductSummary
              src={bottomImg5}
              description={translations.product6Description}
              caption={translations.product6Caption}
              title={translations.product6Title}
            />
          </div>
        </section>
      </main>
    );
  }
}

export { App };
