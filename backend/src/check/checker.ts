const Diff = require('diff');

const regex = new RegExp(
  '/asm|var|let|map|function|reduce|each|else|new|this|auto|enum|operator|throw|explicit|private|true|break|export|protected|try|case|extern|public|typedef|catch|false|register|typeid|reinterpret_cast|typename|class|return|union|const|friend|unsigned|const_cast|goto|signed|using|continue|if|sizeof|virtual|default|inline|static|void|delete|static_cast|volatile|struct|wchar_t|mutable|switch|dynamic_cast|namespace|template|for|do|while|bool|char|float|short|int|long|double|([\\\\+]|[-]|[\\\\*]|[=]|[%]|[>]|[<]|[!]|[~]|[&]|[|])|(\\\\^=|[\\\\|]=|%=|&=|\\\\*=|\\\\-=|\\\\+=|>>|<<|([|][|])|&&|<=| >=|!=|[=]{2}|]|[\\\\-]{2}|[\\\\+]{2})|(>>=|<<=)|-?[0-9]+[.]?[0-9]*|\\\\w+/g',
);

export class Checker {
  public initialCode: string;
  public searchResults: string[];

  public normalizedInitialCode: string;
  public normalizedSearchResults: string[];

  constructor(
    initialCode: string,
    searchResults: string[],
    normalize?: boolean,
  ) {
    this.initialCode = initialCode;
    this.searchResults = searchResults;
    if (normalize) {
      this.normalizedInitialCode = this._normalize(this.initialCode);
      this.normalizedSearchResults = this.searchResults.map((str: string) =>
        this._normalize(str),
      );
    } else {
      this.normalizedInitialCode = this.initialCode;
      this.normalizedSearchResults = this.filterArray(this.searchResults);
    }
  }

  public levenshtein() {
    const diffs = this.normalizedSearchResults
      .map((str: string) => {
        if (str) {
          const diff = this._levenshtein(this.normalizedInitialCode, str);
          return (
            (1 -
              diff /
                this.getMaxBetweenTwo(
                  this.normalizedInitialCode.length,
                  str.length,
                )) *
            100
          );
        }
        return null;
      })
      .filter((str) => !!str);
    console.log('levenshtein diff ', this.getAvgOfArray(diffs));
  }

  public splitDiif() {
    const diffs = this.normalizedSearchResults.map((str: string) => {
      console.log('this.normalizedInitialCode', this.normalizedInitialCode);
      console.log('str', str);
      const diff = Diff.diffTrimmedLines(this.normalizedInitialCode, str);
      console.log('diff', diff);
    });
  }

  private filterArray(arr: string[]): string[] {
    arr = arr.map((str: string) => {
      return this.checkForCode(str) ? str : null;
    });
    return arr.filter((str) => !!str);
  }

  private checkForCode(str: string): boolean {
    return !!str.match(regex);
  }

  private getMaxBetweenTwo(first: number, second: number): number {
    return first > second ? first : second;
  }

  private getAvgOfArray(arr: number[]): number {
    arr = arr.filter((a) => !!a);
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
  }

  private _levenshtein(s1: string, s2: string, costs?: any) {
    let i, j, flip, ch, chl, ii, ii2, cost;
    const l1 = s1.length;
    const l2 = s2.length;

    costs = costs || {};
    const cr = costs.replace || 1;
    const cri = costs.replaceCase || costs.replace || 1;
    const ci = costs.insert || 1;
    const cd = costs.remove || 1;

    const cutHalf = (flip = Math.max(l1, l2));

    const minCost = Math.min(cd, ci, cr);
    const minD = Math.max(minCost, (l1 - l2) * cd);
    const minI = Math.max(minCost, (l2 - l1) * ci);
    const buf = new Array(cutHalf * 2 - 1);

    for (i = 0; i <= l2; ++i) {
      buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
      ch = s1[i];
      chl = ch.toLowerCase();

      buf[flip] = (i + 1) * minI;

      ii = flip;
      ii2 = cutHalf - flip;

      for (j = 0; j < l2; ++j, ++ii, ++ii2) {
        cost = ch === s2[j] ? 0 : chl === s2[j].toLowerCase() ? cri : cr;
        buf[ii + 1] = Math.min(
          buf[ii2 + 1] + cd,
          buf[ii] + ci,
          buf[ii2] + cost,
        );
      }
    }
    return buf[l2 + cutHalf - flip];
  }

  private _normalize(str: string): string {
    str = str.toLowerCase();
    str = str.replace(
      /([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&\;\:\@])/g,
      ' ',
    );
    str = str.replace(/\s{2,}/g, ' ');
    str = str.replace(/\t/g, ' ');
    str = str
      .toString()
      .trim()
      .replace(/(\r\n|\n|\r)/g, ' ');
    return str;
  }
}
