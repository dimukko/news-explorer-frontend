const FORM_ERRORS = {
  errors: {
    wrongEmailFormat: 'Неправильный формат email',
    wrongEmailOrPassword: 'Неверная почта или пароль',
    emptyField: 'Поле не может быть пустым',
    serverError: 'Произошла серверная ошибка',
    conflict: 'Пользователь с данным Email уже зарегистрирован',
    connectionLost: 'Не удалось отправить запрос, проблема с соединением или сервер недоступен',
    emptyQuery: 'Введите ключевое слово от 2 символов',
    outOfRangeName: 'Должно быть от 2 до 30 символов',
    outOfRangePassword: 'Должно быть от 8 до 30 символов',
    badRequest: 'Некорректный запрос',
  },
};

export default FORM_ERRORS;
