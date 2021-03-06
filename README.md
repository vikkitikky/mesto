# Проект: Место
Сервис для ведения личного фотоальбома путешествий по России. Пользователь может добавлять свои фотографии, лайкать карточки, менять информацию о себе.

## [Ссылка на проект](https://vikkitikky.github.io/mesto)

### Технологии
В проекте используется методология БЭМ. Сетки построены при использовании grid и flexbox.
Для создания адаптивной верстки используются media-запросы, две основные точки: 925px и 665px.
Страница способна ужиматься до 250px без потери функционала и нарушения отображения.

Для открытия и закрытия попап-окон используется метод toggle и добавлены слушатели событий на кнопки интерфейса.
Первичное заполнение страницы карточками происходит с помощью метода map - подготавливается массив готовых карточек, которые в дальнейшем добавляются на страницу.
Добавление карточек происходит следующим образом:
1) Создан и скопирован template
2) Функции getCard передается объект со свойствами name и link, создаётся копия шаблона - cardElement, результатом работы функции является возврат готовой карточки.
3) Функция renderCard размещает результат работы getCard в начале контейнера

Заполнение форм происходит путем изменения стандартной функции отправки формы. Функция размещает значение полей ввода в нужных элементах страницы.
### Изменения в шестой проектной
1) Добавлена валидация форм и полей ввода.
2) Состояние кнопки submit изменяется исходя из валидности полей ввода.
3) Все попап-окна закрываются по клику за пределами модального окна, а также по нажатию на кнопку Esc.
4) Обработчики событий перенесены с кнопок на родительский контейнер.

### Изменения в седьмой проектной
1) Добавлено два класса: для валидации форм, добавления контентных карточек
2) Произведен рефакторинг кода в соответствии с новыми классами
3) Разделены функции открытия-закрытия попапов

### Изменения в восьмой проектной
1) Добавлены новые классы: Popup, PopupWithForm, PopupWithImage, Section и UserInfo
2) Настроена сборка проекта вебпаком

### Изменения в девятой проектной
1) Добавлен класс Api. Методами этого класса происходит обращения к серверу для получения, удаления, изменения и добавления данных
2) Произведен рефакторинг класса Card
