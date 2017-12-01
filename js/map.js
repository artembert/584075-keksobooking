(function () {

  'use strict';

  var min;
  var max;
  var imageStartRange = 1;
  var imageEndRange = 8;
  var cardObjectsCount = 8;

  var objectNames = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var objectTypes = ['flat', 'house', 'bungalo'];
  var objectCheckinTimes = ['12:00', '13:00', '14:00'];
  var objectCheckoutTimes = ['12:00', '13:00', '14:00'];
  var objectAllFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var objectPhotos = [];
  var cardObjectsArray = [];

//ссылка на пустой объект
var objectsFragment = document.createDocumentFragment();
  // шаблон в который копируем объект DocumentFragment (явл-ся NODом)
  var mapPinsObjectTemplate = document.querySelector('template').content;
  // блок перед которым будем вставлять блоки с нашими элементами
  var lookoutEl = document.querySelector('.map__filters-container');
  // рабочий блок
  var blockMap = document.querySelector('.map');



//===========================================================================================



createObjectsArray(cardObjectsCount);
blockMap.classList.remove('map--faded');

   // отображаем объекты во фрагменте
   //renderObject(cardObjectsArray);
   //console.log(pinObjectNode);
   //выводим все объекты перед блоком .map__filters-container
   renderObjects(objectsFragment, cardObjectsArray);

//===========================================================================================



    // создаем массив объектов "Объявление"
    function createObjectsArray(cardObjectsCount) {

     var imageObjectNumbers = getRandomNonRepeatingValue(imageStartRange, imageEndRange);
     var objectLocationX = getRandomValue(300, 900);
     var objectLocationY = getRandomValue(100, 500);

     objectNames = objectNames.sort(compareRandom);
     objectTypes = objectTypes.sort(compareRandom);

     for (var i = 0; i < cardObjectsCount; i++) {

      var cardObject = {
        author: {
          avatar: 'img/avatars/user0'+ imageObjectNumbers[i]+'.png'
        },
        offer: {
          title: objectNames[i],
          address: objectLocationX + ', ' + objectLocationY,
          price: getRandomValue(1000, 1000000),
          type: objectTypes[getRandomValue(0, objectTypes.length - 1)],
          rooms: getRandomValue(1, 5),
          guests: getRandomValue(1, 1000),
          checkin: objectCheckinTimes[getRandomValue(0, objectCheckinTimes.length - 1)],
          checkout: objectCheckoutTimes[getRandomValue(0, objectCheckoutTimes.length - 1)],
          features:getObjectFeatures(objectAllFeatures),
          description: '',
          photos: objectPhotos
        },
        location: {
         x: objectLocationX,
         y: objectLocationY
       }
     };

     cardObjectsArray.push(cardObject);
     console.log(cardObject);

   }
   console.log('1. cardObjectsArray[0].author.avatar = ' + cardObjectsArray[0].author.avatar);
   return cardObjectsArray;

 }




//===========================================================================================




  // выводим все объекты перед блоком .map__filters-container
  function renderObjects(objectsFragment, cardObjectsArray) {
    for (var i = 0; i <= cardObjectsArray.length - 1; i++) {
      //objectsFragment.appendChild(renderObject(cardObjectsArray[i]));
      blockMap.insertBefore(renderObject(cardObjectsArray[i]), lookoutEl);
    }
  }


    // функция вывода объекта в верстку / отрисовка шаблона объекта в документ
    function renderObject(object) {
      console.log('object.author.avatar = ' + object.author.avatar);

      var pinObjectNode = mapPinsObjectTemplate.cloneNode(true);
      pinObjectNode.querySelector('.popup__avatar').src = object.author.avatar;
      pinObjectNode.querySelector('h3').textContent = object.offer.title;
      pinObjectNode.querySelector('p small').textContent =  object.offer.address; // !!!!!! непраыивильно похоже вывожу
      pinObjectNode.querySelector('.popup__price').textContent = object.offer.price + '&#x20bd;/ночь'; // !!!!!! не отрабатывеет спецсимвол

// навреное можно было записать короче
if(object.offer.type === 'flat') object.offer.type = 'квартира';
if(object.offer.type === 'bungalo') object.offer.type = 'Бунгало';
if(object.offer.type === 'house') object.offer.type = 'Дом';
pinObjectNode.querySelector('h4').textContent = object.offer.type;


pinObjectNode.querySelector('.capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
pinObjectNode.querySelector('.stay__time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
pinObjectNode.querySelector('.description').textContent = object.offer.description;

//console.log(object.offer.features);
for(var i = 0; i < object.offer.features.length; i++) {
  var elListFeatures = document.createElement('li');
  elListFeatures.classList.add('feature', 'feature--' + object.offer.features[i] + '');
  pinObjectNode.querySelector('.popup__features').innerHTML += elListFeatures;
}

pinObjectNode.querySelector('.map__pin').style = object.offer.address;
//

return pinObjectNode;

}



  // функция перемешивания значений в массиве
  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }

// получить случайное число в диапозоне от min до max включительно
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// получить массив случайных и неповторяющихся чисел
function getRandomNonRepeatingValue(firstNumber, lastNumber) {

  var nonRepeatingValuesArray = [];

  for(var i = firstNumber; i <= lastNumber; i++){
    nonRepeatingValuesArray.push(i);
  }

  return nonRepeatingValuesArray.sort(compareRandom);

}

//получение массива что есть в объекте wifi, parking и пр.
function getObjectFeatures(objectAllFeatures) {

 var objectFeatures = [];

 objectAllFeatures = objectAllFeatures.sort(compareRandom);

 for (var i = 0; i < getRandomValue(0, objectAllFeatures.length); i++){
  objectFeatures.push(objectAllFeatures[i]);
}

return objectFeatures;

}


})();