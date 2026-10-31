import { Article } from '../../controller/controller';
import './news.css';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        if (newsItemTemp) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

                if (idx % 2) {
                    const newsItem = newsClone.querySelector('.news__item');
                    if (newsItem) newsItem.classList.add('alt');
                }

                const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                if (metaPhoto) {
                    metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }

                const metaAuthor = newsClone.querySelector('.news__meta-author');
                if (metaAuthor) {
                    metaAuthor.textContent = item.author || item.source.name;
                }

                const metaDate = newsClone.querySelector('.news__meta-date');
                if (metaDate) {
                    metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }

                const descTitle = newsClone.querySelector('.news__description-title');
                if (descTitle) descTitle.textContent = item.title;

                const descSource = newsClone.querySelector('.news__description-source');
                if (descSource) descSource.textContent = item.source.name;

                const descContent = newsClone.querySelector('.news__description-content');
                if (descContent) descContent.textContent = item.description;

                const readMore = newsClone.querySelector('.news__read-more a');
                if (readMore) readMore.setAttribute('href', item.url);

                fragment.append(newsClone);
            });
        }

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
