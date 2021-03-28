import products from './products';
import Valval from 'valval';

const addProducts = array => {
  const list = document.querySelector('.products__list');

  array.map(item => {
    const product = `
    <li class="products__list-item" data-product="${item.category}">
      <figure>
        <img class="products__list-item-img" src="${item.img}" alt="${item.title}">
        <h3 class="products__list-item-title">${item.title} ${item.otherTitle ? `<span class="products__list-item-additional-title">${item.otherTitle}</span>` : ''}</h3>
        <div class="products__list-item-price">
          <p class="products__list-item-p ${item.price.newPrice ? 'old-price' : ''}">
            ${item.price.nowPrice ? `$${item.price.nowPrice}` : 'SOLD OUT'}
            ${item.price.newPrice ? `<span class="products__list-item-new-price">$${item.price.newPrice}</span>` : ''}
          </p>
        </div>
      </figure>
    </li>
    `;

    list.innerHTML += product;
  });
}

addProducts(products);

const filterProducts = () => {
  const items = document.querySelectorAll('.products__header-list-item');
  const showActiveClass = num => items[num].classList.add('active-filter');
  const hideActiveClass = () => items.forEach(item => item.classList.remove('active-filter'));
  const listProducts = document.querySelector('.products__list');
  const alertMessage = document.querySelector('.products__alert-message');

  showActiveClass(0);

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Switching active class
      hideActiveClass();
      showActiveClass(index);

      // Filter products
      const filterName = item.dataset.filterProduct;
      const filterOfProducts = products.filter(prd => prd.category === filterName);

      listProducts.innerHTML = '';

      if (filterName === 'all') {
        addProducts(products);
        alertMessage.style.display = 'none';
      } else {
        if (filterOfProducts.length) {
          addProducts(filterOfProducts);
          alertMessage.style.display = 'none';
        } else {
          alertMessage.style.display = 'block';
        }
      }
    });
  });
}

filterProducts();

const validationSendEmail = () => {
  const valid = document.querySelector('.contact__form-valid');
  const invalid = document.querySelector('.contact__form-invalid');

  const options = { 
    preventDefault: true,
    email: {
      mail: true,
      required: true,
      handlerWhenValidElement: function() {
        valid.style.display = 'block';
        invalid.style.display = 'none';
      },
      handlerWhenInvalidElement: function() {
        valid.style.display = 'none';
        invalid.style.display = 'block';
      }
    }
  }

  new Valval().start(options);
}

validationSendEmail();