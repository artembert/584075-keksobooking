'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var blockMap = document.querySelector('.map');

  window.cardsUtils = {

    /*  выводим все объекты перед блоком .map__filters-container */
    renderFirstObject: function renderFirstObject(parentContainer, cardObjectsResultingArray, number) {

      var objectFragment = document.createDocumentFragment();
      var mapPopupObjectTemplate = document.querySelector('template').content.querySelector('article.map__card');

      /* блок перед которым будем вставлять блоки с нашими элементами */
      var lookoutEl = document.querySelector('.map__filters-container');
      objectFragment.appendChild(window.cardsUtils.renderObject(mapPopupObjectTemplate, cardObjectsResultingArray[number]));

      parentContainer.insertBefore(objectFragment, lookoutEl);
    },

    /*  функция вывода объекта в верстку / отрисовка шаблона объекта в документ */
    renderObject: function renderObject(mapPopupObjectTemplate, object) {

      var pinObjectNode = mapPopupObjectTemplate.cloneNode(true);
      var popupClose = pinObjectNode.querySelector('.popup__close');
      pinObjectNode.querySelector('.popup__avatar').src = object.author.avatar;
      pinObjectNode.querySelector('h3').textContent = object.offer.title;
      pinObjectNode.querySelector('p small').textContent = object.offer.address;
      pinObjectNode.querySelector('.popup__price').innerHTML = object.offer.price + ' &#x20bd;/ночь';
      popupClose.setAttribute('tabindex', '0');

      popupClose.addEventListener('click', window.cardsUtils.closePopup);

      popupClose.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          window.cardsUtils.closePopup();
        }
      });

      if (object.offer.type === 'flat') {
        object.offer.type = 'Квартира';
      }
      if (object.offer.type === 'bungalo') {
        object.offer.type = 'Бунгало';
      }
      if (object.offer.type === 'house') {
        object.offer.type = 'Дом';
      }
      pinObjectNode.querySelector('h4').textContent = object.offer.type;
      pinObjectNode.querySelector('.capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
      pinObjectNode.querySelector('.stay__time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
      pinObjectNode.querySelector('.description').textContent = object.offer.description;

      /*  удаление дочерних элементов */
      var el = pinObjectNode.querySelector('.popup__features');
      while (el.lastChild) {
        el.removeChild(el.lastChild);
      }

      for (var i = 0; i < object.offer.features.length; i++) {
        var featureId = object.offer.features[i];
        var elListFeatures = document.createElement('li');
        elListFeatures.classList.add('feature', 'feature--' + featureId);
        pinObjectNode.querySelector('.popup__features').appendChild(elListFeatures);
      }

      return pinObjectNode;

    },

    /* закрытие окна */
    onPopupEscPress: function onPopupEscPress(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.cardsUtils.closePopup();
      }
    },

    closePopup: function closePopup() {
      window.cardsUtils.deleteCardObject();
      window.pinsUtils.deleteActiveClass();
    },

    deleteCardObject: function deleteCardObject() {
      var destroyed = document.querySelector('.map__card');
      if (destroyed) {
        destroyed.remove();
      }
    },

    /* открытие окна */
    openPopupCardObject: function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        window.pinsUtils.deleteActiveClass();
        pin.classList.add('map__pin--active');
        window.cardsUtils.deleteCardObject();
        var indexObject = pin.getAttribute('data-objectid');
        window.cardsUtils.renderFirstObject(blockMap, window.data.cardObjectsArray, indexObject);
      }
    }
  };


})();