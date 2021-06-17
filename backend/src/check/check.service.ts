import { Injectable } from '@nestjs/common';
import { GoogleService } from '../google/google.service';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Checker } from './checker';

@Injectable()
export class CheckService {
  constructor(private googleService: GoogleService) {}

  async check(lang: string, content: string) {
    const pages = await this.getPages(lang, content);
    const totalPages = pages.reduce((acc: number, value: any) => {
      return (acc += +value.totalPages);
    }, 0);
    const pageLinks = [
      ...new Set(
        pages.reduce((acc: string[], value: any) => {
          return [...acc, ...value.pages];
        }, []),
      ),
    ];
    const pageContentsPromise = pageLinks.map(async (link: string) => {
      const html = await this.getPageContent(link);
      const pageCode = this.parseHtml(html, content);

      return {
        content: pageCode,
        url: link,
      };
    });
    const pageContentsArray = await Promise.all(pageContentsPromise);
    const pageContentsArrayFiltered = pageContentsArray.filter(
      (item) => !!item,
    );
    const checker = new Checker(content, pageContentsArrayFiltered);
    const levenshtein = checker.levenshtein();
    return {
      expand: levenshtein,
    };
  }

  async getPages(lang: string, content: string) {
    return this.fullTextSearch(content);
  }

  async fullTextSearch(
    content: string,
  ): Promise<{ totalPages: number; pages: string[] }[]> {
    const response = await this.googleService.search(
      encodeURIComponent(content),
    );
      if (response && response.data && response.data.items && response.data.items.length) {
      const pages = response.data.items.map((item) => {
        return item.link;
      });
      return [
        {
          totalPages: +response.data.searchInformation.totalResults,
          pages: pages,
        },
      ];
    }
    return [
      {
        totalPages: 0,
        pages: [],
      },
    ];
  }

  lineSearch(content: string): Promise<any>[] {
    return content.split('\n').map(async (line: string) => {
      const pages: string[] = [];
      const response = await this.googleService.search(
        encodeURIComponent(line),
      );
      if (response && response.data) {
        if (response.data.items && response.data.items[0]) {
          pages.push(response.data.items[0].link);
        }
        if (response.data.items && response.data.items[1]) {
          pages.push(response.data.items[1].link);
        }
        return {
          totalPages: response.data.searchInformation.totalResults,
          pages: pages,
        };
      }
      return {
        totalPages: 0,
        pages: [],
      };
    });
  }

  async getPageContent(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  private parseHtml(html: string, content: string): string[] {
    const $ = cheerio.load(html, null, true);
    const code = [];
    $('code').each((i: number, $el) => {
      code.push($($el).html());
    });
    return code;
  }

  private flattern(arr: string[][]): string[] {
    return arr.reduce((acc, val) => acc.concat(val), []);
  }
}
