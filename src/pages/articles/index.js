import './index.css';

import Auth from '../../js/modules/auth';

import MainApi from '../../js/api/MainApi';
import MAIN_API_OPTIONS from '../../js/constants/main-api';

import dates from '../../js/utils/dates';

import Header from '../../js/modules/header';
import HEADER_OPTIONS from '../../js/constants/header';

import Results from '../../js/modules/results';
import RESULTS_OPTIONS from '../../js/constants/results';

import SavedArticles from '../../js/modules/saved-articles';
import SAVED_OPTIONS from '../../js/constants/saved-articles';

import createArticleInstance from '../../js/utils/article';
import ARTICLE_OPTIONS from '../../js/constants/article';

import News from '../../js/modules/news';
import NEWS_CHUNKS from '../../js/constants/news';


const news = new News('saved', NEWS_CHUNKS);

const auth = new Auth('saved');

const mainApi = new MainApi(MAIN_API_OPTIONS);

const header = new Header('dark', HEADER_OPTIONS);

const results = new Results('saved', RESULTS_OPTIONS);

const savedArticles = new SavedArticles(SAVED_OPTIONS);

auth.setDependencies({
  mainApi, header, HEADER_OPTIONS, results, savedArticles,
});

results.setDependencies({
  dates,
  createArticleInstance,
  RESULTS_OPTIONS,
  auth,
  mainApi,
  ARTICLE_OPTIONS,
  savedArticles,
  news,
});

savedArticles.setDependencies({
  mainApi, auth, results,
});

auth.sendCheckRequest();
