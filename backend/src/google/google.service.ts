import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleService {
  async search(search_string: string) {
    try {
      // return await axios.get(
      //   `https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyAwf9qZKJQ0GmDGZkD1rG8ZuSOsU9JHCWU&cx=ea0efc56814a38ab4&q=${search_string}`,
      // );
      return {
        data: {
          kind: 'customsearch#search',
          url: {
            type: 'application/json',
            template:
              'https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json',
          },
          queries: {
            request: [
              {
                title: 'Google Custom Search - const',
                totalResults: '24800000',
                searchTerms: 'const',
                count: 10,
                startIndex: 1,
                inputEncoding: 'utf8',
                outputEncoding: 'utf8',
                safe: 'off',
                cx: '61a2ee1a8eb415367',
              },
            ],
            nextPage: [
              {
                title: 'Google Custom Search - const',
                totalResults: '24800000',
                searchTerms: 'const',
                count: 10,
                startIndex: 11,
                inputEncoding: 'utf8',
                outputEncoding: 'utf8',
                safe: 'off',
                cx: '61a2ee1a8eb415367',
              },
            ],
          },
          context: {
            title: '4acfc8006502.ngrok.io',
          },
          searchInformation: {
            searchTime: 0.522664,
            formattedSearchTime: '0.52',
            totalResults: '24800000',
            formattedTotalResults: '24,800,000',
          },
          items: [
            {
              link:
                'https://stackoverflow.com/questions/44184977/axios-request-not-fetching-tweets',
            },
          ],
        },
      };
    } catch (e) {
      console.log(e.response.data);
    }
  }
}
