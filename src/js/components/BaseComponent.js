export default class BaseComponent {
  constructor(props) {
    this._container = props.container;
    this._elements = props.elements;
    this._props = props.options;
    this._errors = props.errors;
    this._mounts = [];
  }

  /* *
   * Добавляет зависимости, нужно для решения цикличности классов
  * */
  setDependencies(dependecies) {
    this._dependencies = dependecies;
  }

  /* *
   * Удаляет содержимое ноды
  * */
  _clearNodeContent(node) {
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
  }

  /* *
   * Добавляет слушатели элементу
  * */
  _setHandlers(currentElement, handlers, event) {
    const element = typeof currentElement === 'object'
      ? currentElement : this._container.querySelector(currentElement);
    handlers.forEach((handler) => {
      element.addEventListener(event, handler);
    });
  }

  /* *
   * Удаляет слушатели элемента
  * */
  _removeHandlers(currentElement, handlers, event) {
    const element = typeof currentElement === 'object'
      ? currentElement : this._container.querySelector(currentElement);

    handlers.forEach((handler) => {
      element.removeEventListener(event, handler);
    });
  }

  /* *
   * Добавляет события в массив
  * */
  _mount({ element, handlers, event = 'click' }) {
    this._setHandlers(element, handlers, event);
    this._mounts.push({ element, handlers, event });
  }

  /* *
   * Массовое добавление обработчиков
  * */
  _mountLocalHandlers(array) {
    array.forEach((item) => {
      this._mount(item);
    });
  }

  /* *
   * Монтирует внешние обработчии из компонента
  * */
  _mountHandlers() {
    if (this._handlers) {
      this._handlers.forEach((item) => {
        this._mount(item);
      });
    }
  }

  /* *
   * Добавляет внешние обработчики в компонент
  * */
  setMountHandlers(array) {
    this._handlers = array;
  }

  /* *
  * Выгрузка всех обработчиков компонента, установленных через _mount либо его родительские методы
  * */
  _unmount() {
    if (this._mounts.length > 0) {
      this._mounts.forEach((item) => {
        this._removeHandlers(item.element, item.handlers, item.event);
      });

      this._mounts = [];
    }
  }

  /* *
  * Устанавливает ошибку в зависимости от типа секции
  * */
  _setError(section, err) {
    let errorField;
    const { connectionLost } = this._dependencies.FORM_ERRORS.errors;

    if (section === 'popup') {
      errorField = this._container.querySelector(this._elements.form).querySelector('#error-server');
    } else if (section === 'page') {
      errorField = document.querySelector('.results__additional-text');
    }
    if (err === 'Failed to fetch' && errorField) {
      errorField.textContent = connectionLost;
    } else if (errorField) {
      const errRus = err.replace(/[^а-яА-ЯёЁ0-9,.\s]?/g, '');
      errorField.textContent = `${errRus}`;
    } else {
      console.log(err);
    }
  }
}
