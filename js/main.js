'use strict';

var PHOTOS_COUNT = 25;
var COMMENTS_LENGTH = 13;
var PICTURE_TEMPLATE = document.querySelector('#picture').content;

var picturesWrapper = document.querySelector('.pictures');

var namesList = ['Стояна', 'Лежана', 'Вынька', 'Бздашек', 'Мыкола', 'Маразмус', 'Гиви', 'Вага', 'Вацлав'];
var messagesList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateComments(count) {
  var commentsArray = [];
  for (var i = 0; i < count; i++) {
    commentsArray.push({
      avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
      message: messagesList[getRandomInRange(0, messagesList.length)],
      name: namesList[getRandomInRange(0, namesList.length)]
    });
  }
  return commentsArray;
}

function generateData(dataLength) {
  var dataArray = [];
  for (var i = 0; i < dataLength; i++) {
    dataArray.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: getRandomInRange(15, 200),
      comments: generateComments(getRandomInRange(0, COMMENTS_LENGTH))
    });
  }
  return dataArray;
}

function renderPhotos(array) {
  var photoFragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var photoNode = PICTURE_TEMPLATE.cloneNode(true);
    var image = photoNode.querySelector('.picture__img');
    image.setAttribute('src', array[i].url);
    var commentsCount = photoNode.querySelector('.picture__comments');
    commentsCount.textContent = array[i].comments.length;
    var photoLikes = photoNode.querySelector('.picture__likes');
    photoLikes.textContent = array[i].likes;
    photoFragment.appendChild(photoNode);
  }

  return photoFragment;
}

var photos = generateData(PHOTOS_COUNT);

picturesWrapper.appendChild(renderPhotos(photos));

/* // 2

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
var bigPictureComment = bigPicture.querySelector('.social__picture');
var bigPictureLikes = bigPicture.querySelector('.likes-count');
var bigPictureComments = bigPicture.querySelector('.comments-count');

bigPicture.classList.remove('hidden');

function fillingElement() {
  bigPictureComment.src = bigPictureImg.src;
  bigPictureLikes.textContent = dataArray[0].likes;
  bigPictureComments.textContent = getRandomInRange(0, messagesList.length);
}

fillingElement(); */
