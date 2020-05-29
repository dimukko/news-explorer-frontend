import Form from './form';

export default class Validation extends Form {
  /* *
   * Валидация через паттерны в тегах html и отправка ошибок в поля
  * */
  _validateInput(input) {
    let validationResult = true;

    const {
      emptyField, wrongEmailFormat, outOfRangeName, outOfRangePassword, emptyQuery,
    } = this._errors;

    if (input.value.length === 0 && input.name !== 'searchInput') {
      this._setInputError(input, emptyField);
      validationResult = false;
    } else if (!input.validity.valid && input.name === 'email') {
      this._setInputError(input, wrongEmailFormat);
      validationResult = false;
    } else if (!input.validity.valid && input.name === 'name') {
      this._setInputError(input, outOfRangeName);
      validationResult = false;
    } else if (!input.validity.valid && input.name === 'password') {
      this._setInputError(input, outOfRangePassword);
      validationResult = false;
    } else if (!input.validity.valid && input.name === 'searchInput') {
      this._setInputError(input, emptyQuery, true);
      validationResult = false;
    } else if (input.name === 'searchInput') {
      this._setInputError(input, false, true);
    } else {
      this._setInputError(input);
    }

    return validationResult;
  }

  /* *
   * Постановка ошибок в поля
  * */
  _setInputError(input, errorText, queryInput) {
    let errorField;
    if (!queryInput) {
      errorField = input.closest('.popup__input-wrap').querySelector(`#error-${input.name}`);
    } else {
      errorField = input.closest('.search__controls').querySelector('#error-search');
    }
    if (errorText) {
      errorField.textContent = errorText;
    } else {
      errorField.textContent = '';
    }
  }
}
