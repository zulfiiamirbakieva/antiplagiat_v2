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
    console.log(pageLinks);
    const pageContentsPromise = pageLinks.map(async (link: string) => {
      const html = await this.getPageContent(link);
      return this.parseHtml(html);
    });
    const pageContentsArray = await Promise.all(pageContentsPromise);
    const checker = new Checker(content, this.flattern(pageContentsArray));
    //checker.normalize();
    // checker.levenshtein();
    checker.splitDiif();
  }

  async getPages(lang: string, content: string) {
    const promise_data = content.split('\n').map(async (line: string) => {
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
    return Promise.all(promise_data);
  }

  async getPageContent(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  private parseHtml(html: string): string[] {
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
