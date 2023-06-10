// 1. при нажатии на стрелки происходит переход к новому блоку элементов
// 2 смена блоков происходит с соответствующей анимацией карусели(способ выполнения анимации не проверяется)
// 3 слайдер бесконечен, т.е.можно бесконечно много нажимать влево или вправо, и каждый раз будет прокрутка в эту сторону с новым набором карточек
// 4 при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана(3 для 1280 px, 2 для 768 px, 1 для 320 px): +4
// 5 каждый новый слайд содержит псевдослучайный набор карточек животных, т.е.формируется из исходных объектов в случайном порядке со следующими условиями:
//     5.1 в текущем блоке слайда карточки с питомцами не повторяются:
//     5.2 в следующем блоке нет дублирования карточек с текущим блоком.Например в слайдере из 3 элементов, следующий выезжающий слайд будет содержать 3(из 8 доступных) новых карточки питомца, таких, каких не было среди 3 х карточек на предыдущем уехавшем слайде:
//     5.3 сохраняется только одно предыдущее состояние.Т.е.при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного:
//     5.4 при каждой перезагрузке страницы формируется новая последовательность карточек:
//     5.5 генерация наборов карточек происходит на основе 8 объектов с данными о животных
// 6 при изменении ширины экрана(от 1280 px до 320 px и обратно), слайдер перестраивается и работает без перезагрузки страницы(набор карточек при этом может как изменяться, так и оставаться тем же, скрывая лишнюю или добавляя недостающую, и сохраняя при этом описанные для слайдера требования

// const animals = [{
//         "name": "Jennifer",
//         "img": "./assets/img/friends-jennifer.png",
//         "type": "Dog",
//         "breed": "Labrador",
//         "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
//         "age": "2 months",
//         "inoculations": ["none"],
//         "diseases": ["none"],
//         "parasites": ["none"]
//     },
//     {
//         "name": "Sophia",
//         "img": "./assets/img/friends-sophia.png",
//         "type": "Dog",
//         "breed": "Shih tzu",
//         "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
//         "age": "1 month",
//         "inoculations": ["parvovirus"],
//         "diseases": ["none"],
//         "parasites": ["none"]
//     },
//     {
//         "name": "Woody",
//         "img": "./assets/img/friends-woody.png",
//         "type": "Dog",
//         "breed": "Golden Retriever",
//         "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
//         "age": "3 years 6 months",
//         "inoculations": ["adenovirus", "distemper"],
//         "diseases": ["right back leg mobility reduced"],
//         "parasites": ["none"]
//     },
//     {
//         "name": "Scarlett",
//         "img": "./assets/img/friends-scarlett.png",
//         "type": "Dog",
//         "breed": "Jack Russell Terrier",
//         "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
//         "age": "3 months",
//         "inoculations": ["parainfluenza"],
//         "diseases": ["none"],
//         "parasites": ["none"]
//     },
//     {
//         "name": "Katrine",
//         "img": "./assets/img/friends-katrine.png",
//         "type": "Cat",
//         "breed": "British Shorthair",
//         "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
//         "age": "6 months",
//         "inoculations": ["panleukopenia"],
//         "diseases": ["none"],
//         "parasites": ["none"]
//     },
//     {
//         "name": "Timmy",
//         "img": "./assets/img/friends-timmy.png",
//         "type": "Cat",
//         "breed": "British Shorthair",
//         "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
//         "age": "2 years 3 months",
//         "inoculations": ["calicivirus", "viral rhinotracheitis"],
//         "diseases": ["kidney stones"],
//         "parasites": ["none"]
//     },
//     {
//         "name": "Freddie",
//         "img": "./assets/img/friends-freddie.png",
//         "type": "Cat",
//         "breed": "British Shorthair",
//         "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
//         "age": "2 months",
//         "inoculations": ["rabies"],
//         "diseases": ["none"],
//         "parasites": ["none"]
//     },
//     {
//         "name": "Charly",
//         "img": "./assets/img/friends-charly.png",
//         "type": "Dog",
//         "breed": "Jack Russell Terrier",
//         "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
//         "age": "8 years",
//         "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
//         "diseases": ["deafness", "blindness"],
//         "parasites": ["lice", "fleas"]
//     }
// ]





const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


prevBtn.addEventListener('click', function() {
    console.log('prev')
})
nextBtn.addEventListener('click', function() {
    console.log('next')
})