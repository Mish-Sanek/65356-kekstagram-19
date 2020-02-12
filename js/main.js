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
      comments: generateComments(getRandomInRange(5, COMMENTS_LENGTH))
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

function renderPicture(index) {
  bigPicture.querySelector('img').src = photos[index].url;
  bigPicture.querySelector('.likes-count').textContent = photos[index].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[index].comments.length;
}

function renderComments(array, index) {
  var commentFragment = document.createDocumentFragment();
  for (var i = 0; i < array[index].comments.length; i++) {
    var COMMENT_TEMPLATE = document.querySelector('.social__comment');
    var commentNode = COMMENT_TEMPLATE.cloneNode(true);
    var commentPicture = commentNode.querySelector('.social__picture');
    commentPicture.setAttribute('src', array[index].comments[i].avatar);
    commentPicture.setAttribute('alt', array[index].comments[i].name);
    var commentText = commentNode.querySelector('.social__text');
    commentText.textContent = array[index].comments[i].message;
    commentFragment.appendChild(commentNode);
  }

  return commentFragment;
}

function renderComment(index) {
  var socialComments = document.querySelector('.social__comments');
  var comments = renderComments(photos, index);
  renderPicture(index);
  socialComments.appendChild(comments);
}

var firstPhotoIndex = 0;
renderComment(firstPhotoIndex);
