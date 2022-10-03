import { encodeDelimitedArray, decodeDelimitedArray } from 'use-query-params';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import moment from 'moment';
import { DateType } from '@constants/enum'

export const fingerPrint = async function () {
  return FingerprintJS.load()
    .then((fp) => fp.get())
    .then((result) => {
      return result.visitorId;
    });
};

export const CommaArrayParam = {
  encode: (array: string[] | null | undefined) =>
    encodeDelimitedArray(array, ','),

  decode: (arrayStr: string | string[] | null | undefined) =>
    decodeDelimitedArray(arrayStr, ','),
};

export function format(str: string, ...args: [string]) {
  for (const k in args) {
    str = str.replace('{' + k + '}', args[k]);
  }
  return str;
}

export function isServer() {
  return typeof window === 'undefined' ? true : false;
}

export function truncate(str: string, n: number) {
  return str && str.length > n ? str.substr(0, n - 3) + '...;' : str;
}

export async function getVideoDimension(
  file: File
): Promise<{ width?: number; height?: number; duration?: number }> {
  return new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.src = url;
      video.addEventListener('loadedmetadata', function () {
        if (this.videoWidth && this.videoHeight) {
          resolve({
            width: this.videoWidth,
            height: this.videoHeight,
            duration: this.duration,
          });
        } else {
          resolve({});
        }
      });
    } catch (err) {
      reject();
    }
  });
}

export async function getImageDimension(
  file: File
): Promise<{ width?: number; height?: number }> {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
      img['src'] = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function processLink(url: string): string {
  try {
    const urlToProcess = new URL(url);
    if (urlToProcess.search.includes('list')) {
      const params = new URLSearchParams(urlToProcess.search.slice(1));
      params.delete('list');
      return `${urlToProcess.origin}${urlToProcess.pathname}?${params}`;
    }
    return url;
  } catch (err) {
    return url;
  }
}

export const limitHtml = (text: string, limit: number) => {
  const changedString = String(text).replace(/<[^>]+>/gm, '');
  return changedString?.length > limit
    ? changedString.substr(0, limit - 1) + ' ...'
    : changedString;
};

export const numberFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

export const extractVideoUrlFromPlaylist = (url: string): string => {
  return url?.indexOf('&', url?.indexOf('?v=')) !== -1
    ? url?.slice(0, url?.indexOf('&', url?.indexOf('?v=')))
    : url;
};

/**
 * TODO: Remove if unused
 */
const getMobileDetect = (userAgent: NavigatorID['userAgent']) => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
  const isSSR = () => Boolean(userAgent.match(/SSR/i));
  const isMobile = () =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = () => Boolean(!isMobile() && !isSSR());
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  };
};
// useless, try better alternatives which already exist
// STYLING BASED ON DEVICE'S SCREEN SIZE, NOT DEVICE'S TYPE
// export const useMobileDetect = () => {
//   const userAgent =
//     typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
//   return getMobileDetect(userAgent);
// };

export const convertUrlParamtoObject = (input: string) => {
  const temp = `{"${decodeURI(input)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')}"}`;

  return JSON.parse(temp);
};

export const capitalizeEveryFirstLetter = (str: string) => {
  return str
    .toLowerCase()
    .replace(new RegExp('(?:\\b|_)([a-z])', 'g'), function ($1) {
      return $1.toUpperCase();
    });
};

export const lowerCaseLastLetter = (str: string) => {
  return str.length > 1
    ? str.substring(0, str.length - 1) + str.slice(-1).toLowerCase()
    : str;
};

export const upperCaseLastLetter = (str: string) => {
  return str.length > 1
    ? str.substring(0, str.length - 1) + str.slice(-1).toUpperCase()
    : str;
};


export const notificationDate = (value: string) => {
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1,'days').startOf('day');
  const thisYear = moment().startOf('year');

  if (!value) { return ""; }

  else if (moment(value).isSame(today, 'd')) { // < today
    return moment(value).format('HH:mm');
  }
  else if (moment(value).isSame(yesterday, 'd')) { // yesterday
    return 'Yesterday';
  }
  else if (moment(value).isSame(thisYear, 'year')) { // this year
    return moment(new Date(value)).format(DateType.FULL_DATE_3);
  }
  else{
    return moment(new Date(value)).format(DateType.FULL_DATE_3);
  }
};

export const onKeyPress = (e) => {
  if (e.which === 13 /* Enter */) {
    e.preventDefault();
  }
} ;
