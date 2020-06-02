const DATE_MONTHS = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const dates = {
  formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}-${month + 1}-${day}`;
  },

  formatDateAgo() {
    const date = new Date();
    const timestamp = date.getTime();
    const dateBeforeTimestamp = timestamp - (1000 * 60 * 60 * 24 * 7);
    const dateBefore = new Date(dateBeforeTimestamp);
    const year = dateBefore.getFullYear();
    const month = dateBefore.getMonth();
    const day = dateBefore.getDate();

    return `${year}-${month + 1}-${day}`;
  },

  formatNewsDate(newsDate) {
    const date = new Date(newsDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${day} ${DATE_MONTHS[month]}, ${year}`;
  },
};

export default dates;
