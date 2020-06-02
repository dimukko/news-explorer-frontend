export default class NewsApi {
  constructor(newsApiOptions, newsApiDependencies) {
    this._apiOptions = newsApiOptions;
    this._dependencies = newsApiDependencies;
    this.getNews = this.getNews.bind(this);
  }

  getNews(query) {
    const { dates } = this._dependencies;
    const {
      url, apiKey, sortBy, pageSize,
    } = this._apiOptions;
    const dateTo = dates.formatDate();
    const dateFrom = dates.formatDateAgo();

    return fetch(
      `${url}q=${query}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`,
    )
      .then((res) => res.json());
  }
}
