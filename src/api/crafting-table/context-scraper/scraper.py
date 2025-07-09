import requests
from bs4 import BeautifulSoup

# Shared user-agent for all requests
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                  '(KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}

def scrape_articles(url, source, selector_func):
    """Generic scraper helper.

    Makes a GET request to the target url and passes the response's text to a selector function.
    Once the selector function returns the article data, formats the article object with all
    required properties.

    The selector function uses BeautifulSoup to parse the HTML string and returns the article's
    headline, link, and content.

    Example usage:
    articles = scrape_articles('https://site.com', 'site', selector);
    """

    response = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(response.text, 'html.parser')

    articles = selector_func(soup)
    for article in articles:
        article['source'] = source
        if 'content' not in article:
            article['content'] = ''

    return articles

#==================================================================================================
# TechCrunch
#==================================================================================================
def fetch_techcrunch_articles():
    def selector(soup):
        return [
            {
                'headline': tag.get_text(strip=True),
                'link': href,
                'content': fetch_techcrunch_content(href)
            }
            for tag in soup.find_all('a', class_='loop-card__title-link')
            if (href := tag['href'])
        ]

    return scrape_articles('https://techcrunch.com', 'techcrunch', selector)

def fetch_techcrunch_content(url):
    def selector(soup):
        return [
            {
                'content': '\n'.join(
                    [
                        tag.get_text(strip=True) 
                        for tag in soup.find_all('p', class_='wp-block-paragraph')
                    ]
                )
            }
        ]
    
    results = scrape_articles(url, 'techcrunch', selector)
    return results[0]['content'] if results else ''

#==================================================================================================
# Product Hunt
#==================================================================================================
def fetch_producthunt_articles():
    def selector(soup):
        return [
            {
                'headline': tag.get_text(strip=True),
                'link': link,
                'content': content
            }
            for anchor in soup.find_all('a', href=True)
            if (href := anchor['href']).startswith('/stories/')
            if (tag := anchor.find('div'))
            if (link := f'https://www.producthunt.com{href}')
            if (content := fetch_producthunt_content(link))
        ]

    return scrape_articles('https://www.producthunt.com/stories', 'producthunt', selector)

def fetch_producthunt_content(url):
    def selector(soup):
        tag = soup.find('div', id='story-body')
        if not tag:
            return []

        content = tag.get_text(separator='\n', strip=True)
        return [{'content': content}]
    
    results = scrape_articles(url, 'producthunt', selector)
    return results[0]['content'] if results else ''

#==================================================================================================
# The Verge
#==================================================================================================
def fetch_theverge_articles():
    target_directories = ('/news/', '/ai-artificial-intelligence/')
    def selector(soup):
        return [
            {
                'headline': tag.get_text(strip=True),
                'link': link,
                'content': content
            }
            for tag in soup.find_all('a', href=True)
            if (href := tag['href']).startswith(target_directories)
            if (link := f'https://www.theverge.com{href}')
            if (content := fetch_theverge_content(link))
        ]
    
    return scrape_articles('https://www.theverge.com', 'theverge', selector)

def fetch_theverge_content(url):
    def selector(soup):
        tag = soup.find('div', id='zephr-anchor')
        if not tag:
            return []
        
        content = tag.get_text(separator=' ', strip=True)
        return [{'content': content}]
    
    results = scrape_articles(url, 'theverge', selector)
    return results[0]['content'] if results else ''

#==================================================================================================
# The A.V. Club
#==================================================================================================
def fetch_avclub_articles():
    def selector(soup):
        ul = soup.find('ul', class_='articles')
        if not ul:
            return []

        articles = []
        for li in ul.find_all('li', class_='grid-x'):
            link_tag = li.find('a', class_='copy-container')
            title_tag = link_tag.find('b', class_='title') if link_tag else None

            if link_tag and title_tag:
                articles.append({
                    'headline': title_tag.get_text(strip=True),
                    'link': link_tag['href'],
                    'content': fetch_avclub_content(link_tag['href'])
                })

        return articles
    
    return scrape_articles('https://www.avclub.com', 'avclub', selector)

def fetch_avclub_content(url):
    def selector(soup):
        return [
            {
                'content': ' '.join(
                    [
                        tag.get_text(strip=True)
                        for tag in soup.find_all('span', style=True)
                    ]
                )
            }
        ]
    
    results = scrape_articles(url, 'avclub', selector)
    return results[0]['content'] if results else ''
