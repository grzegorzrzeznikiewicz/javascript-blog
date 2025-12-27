{
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
        /* [DONE] remove class 'active' from all article links */
        const activeLinks = document.querySelectorAll(optTitleListSelector + ' a.active');
        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [IN PROGRESS] add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement);
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll(optArticleSelector + '.active');
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* get 'href' attribute from the clicked link */
        const href = clickedElement.getAttribute('href');

        /* find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(href);

        /* add class 'active' to the correct article */
        targetArticle.classList.add('active');
    }

    function addClickListenersToTitles() {
        const links = document.querySelectorAll(optTitleListSelector + ' a');
        for (const link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {
        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        /* find all the articles and save them to variable: articles */
        const articles = document.querySelectorAll(optArticleSelector);

        let html = '';

        /* for each article */
        for (let article of articles) {
            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            /* get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;


            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '">' + articleTitle + '</a></li>';

            /* insert link into titleList */
            html += linkHTML;
            console.log(html);
        }
        titleList.innerHTML = html;
        addClickListenersToTitles();
    }
    generateTitleLinks();
}