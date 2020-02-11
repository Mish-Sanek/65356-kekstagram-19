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
      message: messagesList[getRandomInRange(0, messagesList.length - 1)],
      name: namesList[getRandomInRange(0, namesList.length)]
    });
  }
  return commentsArray;
}

function generatePhotosData(count) {
  var dataArray = [];
  for (var i = 0; i < count; i++) {
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

var photos = generatePhotosData(PHOTOS_COUNT);

picturesWrapper.appendChild(renderPhotos(photos));

var bigPicture = document.querySelector('.big-picture');

bigPicture.classList.remove('hidden');
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.body.classList.add('modal-open');

function generateComment() {
  bigPicture.querySelector('img').src = photos[0].url;
  bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;

  for (var i = 0; i < photos[0].comments.length; i++) {
    var socialComments = bigPicture.querySelector('.social__comments');
    var socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    var socialPicture = document.createElement('img');
    socialPicture.classList.add('social__picture');
    socialPicture.src = photos[0].comments[i].avatar;
    socialPicture.alt = photos[0].comments[i].name;
    var socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = photos[0].comments[i].message;
    socialComments.appendChild(socialComment);
    socialComment.appendChild(socialPicture);
    socialComment.appendChild(socialText);
  }
}

generateComment();
