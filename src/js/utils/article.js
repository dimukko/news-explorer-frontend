import Article from '../modules/article';

/* *
 * Создание объекта статьи без прямого вызова в других классах
* */
const createArticleInstance = (articleProps, ARTICLE_OPTIONS) => {
  const instance = new Article(articleProps, ARTICLE_OPTIONS);
  return instance;
};

export default createArticleInstance;
