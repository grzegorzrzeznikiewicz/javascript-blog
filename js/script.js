{
    const opts = {
        tagSizes: {
            count: 5,
            classPrefix: 'tag-size-',
        },
        classNames: {
            active: 'active',
        },
    };

    const select = {
        all: {
            articles: '.post',
            linksTo: {
                tags: 'a[href^="#tag-"]',
                authors: 'a[href^="#author-"]',
            },
        },
        article: {
            title: '.post-title',
            tags: '.post-tags .list',
            author: '.post-author',
        },
        listOf: {
            titles: '.titles',
            tags: '.tags.list',
            authors: '.authors.list',
        },
    };

    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
        /* [DONE] remove class 'active' from all article links */
        const activeLinks = document.querySelectorAll(select.listOf.titles + ' a.' + opts.classNames.active);
        for (let activeLink of activeLinks) {
            activeLink.classList.remove(opts.classNames.active);
        }

        /* [IN PROGRESS] add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement);
        clickedElement.classList.add(opts.classNames.active);

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll(select.all.articles + '.' + opts.classNames.active);
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove(opts.classNames.active);
        }

        /* get 'href' attribute from the clicked link */
        const href = clickedElement.getAttribute('href');

        /* find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(href);

        /* add class 'active' to the correct article */
        targetArticle.classList.add(opts.classNames.active);
    }

    function addClickListenersToTitles() {
        const links = document.querySelectorAll(select.listOf.titles + ' a');
        for (const link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    function generateTitleLinks(customSelector = '') {
        /* remove contents of titleList */
        const titleList = document.querySelector(select.listOf.titles);
        titleList.innerHTML = '';

        /* find all the articles and save them to variable: articles */
        const articles = document.querySelectorAll(select.all.articles + customSelector);

        let html = '';

        /* for each article */
        for (let article of articles) {
            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            /* get the title from the title element */
            const articleTitle = article.querySelector(select.article.title).innerHTML;


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

    function calculateTagsParams(tags) {
        let params = {
            min: 99999,
            max: 0
        };
        for(let tag in tags) {
            if(tags[tag] < params.min){
                params.min = tags[tag];
            }

            if(tags[tag] > params.max){
                params.max = tags[tag];
            }
        }
        return params;
    }

    function calculateTagClass(count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
        return opts.tagSizes.classPrefix + classNumber;
    }

    function generateTags() {
        /* [NEW] create a new variable allTags with an empty object */
        let allTags = {};
        /* find all articles */
        const articles = document.querySelectorAll(select.all.articles);

        /* START LOOP: for every article */
        for(let article of articles) {
            /* find tags wrapper */
            const tagsList = article.querySelector(select.article.tags);
            /* make html variable with empty string */
            let html = '';
            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');
            /* START LOOP: for each tag */
            for(let tag of articleTagsArray) {
                /* generate HTML of the link */
                const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li> `;
                console.log(linkHTML);
                /* add generated code to html variable */
                html += linkHTML;
                /* [NEW] check if this link is NOT already in allTags*/
                if(!allTags[tag]){
                    /* [NEW] add tag to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
                /* END LOOP: for wach tag */
            }
            /* insert HTML of all the links into the wrapper */
            tagsList.innerHTML = html;
        }
        /* END LOOP: for every article */

        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector(select.listOf.tags);
        const tagsParams = calculateTagsParams(allTags);
        console.log('tagsParams:', tagsParams);
        /* [NEW] create variable for all links HTML code */
        let allTagsHTML = '';
        /* [NEW] START LOOP: for each tag in allTags: */
        for(let tag in allTags){
            /* [NEW] generate code of a link and add it to allTagsHTML */
            allTagsHTML += '<a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a> ';
        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        tagList.innerHTML = allTagsHTML;
    }
    generateTags();

    function tagClickHandler(event){
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const activeTagLinks = document.querySelectorAll('a.' + opts.classNames.active + '[href^="#tag-"]');
        /* START LOOP: for each active tag link */
        for(let activeTagLink of activeTagLinks) {
            /* remove class active */
            activeTagLink.classList.remove(opts.classNames.active);
            /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for(let tagLink of tagLinks) {
            /* add class active */
            tagLink.classList.add(opts.classNames.active);
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }
    function addClickListenersToTags(){
        /* find all links to tags */
        const tagLinks = document.querySelectorAll(select.all.linksTo.tags);
        /* START LOOP: for each link */
        for(let tagLink of tagLinks) {
            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }
    }
    addClickListenersToTags();

    function generateAuthors(){
        /* [NEW] create a new variable allAuthors with an empty object */
        let allAuthors = {};
        /* find all articles */
        const articles = document.querySelectorAll(select.all.articles);

        /* START LOOP: for every article */
        for(let article of articles) {
            /* find author wrapper */
            const authorWrapper = article.querySelector(select.article.author);
            /* get author from data-author attribute */
            const articleAuthor = article.getAttribute('data-author');
            /* generate HTML of the link */
            const linkHTML = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;
            /* insert HTML of the link into the wrapper */
            authorWrapper.innerHTML = linkHTML;
            /* [NEW] check if this author is NOT already in allAuthors */
            if(!allAuthors[articleAuthor]){
                /* [NEW] add author to allAuthors object */
                allAuthors[articleAuthor] = 1;
            } else {
                allAuthors[articleAuthor]++;
            }
        }
        /* END LOOP: for every article */

        /* [NEW] find list of authors in right column */
        const authorList = document.querySelector(select.listOf.authors);
        /* [NEW] create variable for all links HTML code */
        let allAuthorsHTML = '';
        /* [NEW] START LOOP: for each author in allAuthors: */
        for(let author in allAuthors){
            /* [NEW] generate code of a link and add it to allAuthorsHTML */
            allAuthorsHTML += `<li><a href="#author-${author}">${author} (${allAuthors[author]})</a></li>`;
        }
        /* [NEW] END LOOP: for each author in allAuthors: */

        /*[NEW] add HTML from allAuthorsHTML to authorList */
        authorList.innerHTML = allAuthorsHTML;
    }
    generateAuthors();

    function authorClickHandler(event){
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "author" and extract author from the "href" constant */
        const author = href.replace('#author-', '');
        /* find all author links with class active */
        const activeAuthorLinks = document.querySelectorAll('a.' + opts.classNames.active + '[href^="#author-"]');
        /* START LOOP: for each active author link */
        for(let activeAuthorLink of activeAuthorLinks) {
            /* remove class active */
            activeAuthorLink.classList.remove(opts.classNames.active);
            /* END LOOP: for each active author link */
        }
        /* find all author links with "href" attribute equal to the "href" constant */
        const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found author link */
        for(let authorLink of authorLinks) {
            /* add class active */
            authorLink.classList.add(opts.classNames.active);
            /* END LOOP: for each found author link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenersToAuthors(){
        /* find all links to authors */
        const authorLinks = document.querySelectorAll(select.all.linksTo.authors);
        /* START LOOP: for each link */
        for(let authorLink of authorLinks) {
            /* add authorClickHandler as event listener for that link */
            authorLink.addEventListener('click', authorClickHandler);
            /* END LOOP: for each link */
        }
    }
    addClickListenersToAuthors();
}