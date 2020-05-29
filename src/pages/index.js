import './index.css';

import xss from 'xss';

import Auth from '../js/modules/auth';

import MainApi from '../js/api/MainApi';
import MAIN_API_OPTIONS from '../js/constants/main-api';

import dates from '../js/utils/dates';

import NewsApi from '../js/api/NewsApi';
import NEWS_API_OPTIONS from '../js/constants/news-api';

import Header from '../js/modules/header';
import HEADER_OPTIONS from '../js/constants/header';

import Search from '../js/modules/search';
import SEARCH_OPTIONS from '../js/constants/search';
import FORM_ERRORS from '../js/constants/errors';

import Results from '../js/modules/results';
import RESULTS_OPTIONS from '../js/constants/results';

import createArticleInstance from '../js/utils/article';
import ARTICLE_OPTIONS from '../js/constants/article';

import News from '../js/modules/news';
import NEWS_OPTIONS from '../js/constants/news';

import Validation from '../js/modules/validation';

import PopupAuth from '../js/modules/popup-auth';

import PopupReg from '../js/modules/popup-reg';

import PopupSuccess from '../js/modules/popup-success';

import { POPUP_AUTH_OPTIONS, POPUP_REG_OPTIONS, POPUP_SIGNUP_OPTIONS } from '../js/constants/popup';

const news = new News('main', NEWS_OPTIONS);

const validation = new Validation(FORM_ERRORS);

const auth = new Auth();

const mainApi = new MainApi(MAIN_API_OPTIONS);

const newsApi = new NewsApi(NEWS_API_OPTIONS, { dates });

const header = new Header('light', HEADER_OPTIONS);

const results = new Results('main', RESULTS_OPTIONS);

const search = new Search(SEARCH_OPTIONS);

const popupAuth = new PopupAuth(POPUP_AUTH_OPTIONS);

const popupReg = new PopupReg(POPUP_SIGNUP_OPTIONS);

const popupSuccess = new PopupSuccess(POPUP_REG_OPTIONS);

auth.setDependencies({
  mainApi, header, HEADER_OPTIONS, results, popupAuth,
});

search.setDependencies({
  validation, FORM_ERRORS, newsApi, auth, results, xss,
});

results.setDependencies({
  news, dates, createArticleInstance, ARTICLE_OPTIONS, auth, mainApi,
});

popupAuth.setDependencies({
  validation, mainApi, header, popupReg, auth, FORM_ERRORS, xss,
});

popupReg.setDependencies({
  validation, mainApi, header, popupAuth, popupSuccess, FORM_ERRORS, xss,
});

popupSuccess.setDependencies({ popupAuth });

auth.sendCheckRequest();
search.handlers();
