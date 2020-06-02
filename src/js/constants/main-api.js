const MAIN_API_URL = 'http://api.dimukko.ml';

const MAIN_API_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
  routes: {
    signup: `${MAIN_API_URL}/signup`,
    signin: `${MAIN_API_URL}/signin`,
    logout: `${MAIN_API_URL}/logout`,
    getUserData: `${MAIN_API_URL}/users/me`,
    articles: `${MAIN_API_URL}/articles`,
  },
};

export default MAIN_API_OPTIONS;
