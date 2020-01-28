'use strict';

var DATA_LENGTH = 25;

var picturesWrapper = document.querySelector('.pictures');
var commentFragment = document.createDocumentFragment();

var dataArray = [];
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

for (var i = 0; i < DATA_LENGTH; i++) {
  dataArray.push({
    url: 'photos/' + (i + 1) + '.jpg',
    description: '',
    likes: getRandomInRange(15, 200),
    comment: {
      avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
      message: messagesList[getRandomInRange(0, messagesList.length)],
      name: namesList[getRandomInRange(0, namesList.length)]
    }
  });
}

for (i = 0; i < dataArray.length; i++) {
  var commentElement = document.createElement('a');
  commentElement.classList.add('picture');
  var commentAvatar = document.createElement('img');
  commentAvatar.setAttribute('src', dataArray[i].url);
  commentAvatar.setAttribute('class', 'picture__img');
  var commentInfo = document.createElement('p');
  commentInfo.classList.add('picture__info');
  var commentsLikes = document.createElement('span');
  commentsLikes.classList.add('picture__likes');
  commentsLikes.textContent = dataArray[i].likes;
  var commentsCount = document.createElement('span');
  commentsCount.classList.add('picture__comments');
  commentsCount.textContent = getRandomInRange(0, messagesList.length);

  commentElement.appendChild(commentAvatar);
  commentElement.appendChild(commentInfo);
  commentInfo.appendChild(commentsLikes);
  commentInfo.appendChild(commentsCount);
  commentFragment.appendChild(commentElement);
}

picturesWrapper.appendChild(commentFragment);
