const regex = new RegExp(
  '/asm|var|let|map|function|reduce|each|else|new|this|auto|enum|operator|throw|explicit|private|true|break|export|protected|try|case|extern|public|typedef|catch|false|register|typeid|reinterpret_cast|typename|class|return|union|const|friend|unsigned|const_cast|goto|signed|using|continue|if|sizeof|virtual|default|inline|static|void|delete|static_cast|volatile|struct|wchar_t|mutable|switch|dynamic_cast|namespace|template|for|do|while|bool|char|float|short|int|long|double|([\\\\+]|[-]|[\\\\*]|[=]|[%]|[>]|[<]|[!]|[~]|[&]|[|])|(\\\\^=|[\\\\|]=|%=|&=|\\\\*=|\\\\-=|\\\\+=|>>|<<|([|][|])|&&|<=| >=|!=|[=]{2}|]|[\\\\-]{2}|[\\\\+]{2})|(>>=|<<=)|-?[0-9]+[.]?[0-9]*|\\\\w+/g',
);

export class Checker {
  public initialCode: string;
  public searchResults: { content: string[]; url: string }[];

  public normalizedInitialCode: string;
  public normalizedSearchResults: { content: string[]; url: string }[];

  constructor(
    initialCode: string,
    searchResults: { content: string[]; url: string }[],
  ) {
    this.initialCode = initialCode;
    this.searchResults = searchResults;
    this.normalizedInitialCode = this.initialCode;
    this.normalizedSearchResults = this.searchResults;
  }

  public levenshtein() {
    return this.calculateLevenshtein();
  }

  private calculateLevenshtein() {
    return this.normalizedSearchResults
      .map(({ content, url }) => {
        return {
          lv_values: content
            .map((str) => {
              const diff = this._levenshtein(this.normalizedInitialCode, str);
              const diffValue = this.calculateValue(diff, str);
              const shingling = this.shingling(this.normalizedInitialCode, str);
              if (diffValue > 20) {
                return {
                  content: str,
                  value: diffValue,
                  shinglingValue: shingling || 0,
                };
              } else {
                return {
                  content: str,
                  value: 0,
                  shinglingValue: 0,
                };
              }
            })
            .filter((a) => !!a.value),
          url: url,
        };
      })
      .sort((a, b) => {
        const sumOfAValues = a.lv_values.reduce((x, z) => (x += z.value), 0);
        const sumOfBValues = b.lv_values.reduce((x, z) => (x += z.value), 0);
        if (sumOfAValues > sumOfBValues) {
          return -1;
        } else if (sumOfAValues < sumOfBValues) {
          return 1;
        }
        return 0;
      });
  }

  shingling(initial, searched) {
    initial = this.hash(initial);
    searched = this.hash(searched);
    return this.compareShingles(initial, searched);
  }

  private hash(text) {
    text = text.toLowerCase();
    text = this._normalize(text);
    const shingles = this.shingle(text.split(' '), 3);
    return shingles.map((arr) => {
      return arr.map((str) => {
        return this.hashString(str);
      });
    });
  }
  private shingle(collection, size) {
    const shingles = [];
    for (let i = 0; i < collection.length - size + 1; i++) {
      shingles.push(collection.slice(i, i + size));
    }
    return shingles;
  }
  private hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  private union(array_first, array_second) {
    const concat_array = [...array_first, ...array_second];
    return [...new Set(concat_array)];
  }
  private intersect(a, b) {
    return [...new Set(a)].filter((x) => new Set(b).has(x));
  }
  private compareShingles(arr1, arr2) {
    let unionArr = arr1.map((val, key) => {
      if (arr2[key]) {
        return this.union(val, arr2[key]);
      }
    });
    unionArr = unionArr.filter((i) => i);
    let intersectArr = arr1.map((val, key) => {
      if (arr2[key]) {
        return this.intersect(val, arr2[key]);
      }
    });
    intersectArr = intersectArr.filter((i) => i);
    return parseFloat(
      ((intersectArr.flat().length / unionArr.flat().length) * 100).toString(),
    ).toFixed(2);
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

  private calculateValue(diff, str): number {
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
