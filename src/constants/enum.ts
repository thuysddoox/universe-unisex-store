export const Colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'purple',
  'pink',
  'silver',
  'gold',
  'beige',
  'brown',
  'grey',
  'black',
  'white',
];
export const HorseMediaType = {
  IMAGE: 1,
  VIDEO: 3,
  PEDIGREE: 6,
};

export const ROLES = {
  VENDOR: 1,
  PURCHASER: 2,
  ADMIN: 3,
};

export const HEADER_TYPE = {
  SALE: 1,
  LEASE: 2,
  SYNDICATION: 3,
  REHOME: 4,
  REPORT: 5,
  ACTIVE: 6,
  SEARCH: 7,
  NEWS: 8,
};

export const userRoles = [
  {
    id: 1,
    name: 'Vendor',
    value: '1',
    label: 'Vendor',
  },
  {
    id: 2,
    name: 'Purchaser',
    value: '2',
    label: 'Purchaser',
  },
  {
    id: 3,
    name: 'Vendor & Purchaser',
    value: '1,2',
    label: 'Vendor & Purchaser',
  },
];

export const MediaType = {
  PHOTO: 1,
  VIDEO: 3,
  AUDIO: 2,
  ALBUM: 4,
  DOCUMENT: 5,
  PEDIGREE: 6,
  RACE_RECORD: 7,
  APPROVAL_LETTER: 8,
};

export const HorseCategories = {
  BROODMARE: 3,
  RACED: 2,
  STALLION: 4,
  STALLION_NOMINATION: 5,
  UNRACED: 1,
};

export const HorseTypes = {
  FOR_SALE: 1,
  FOR_LEASE: 2,
  FOR_SYNDICATION: 3,
  FOR_REHOMING: 4,
};

export const TabName = {
  SAVED_SEARCH: 'Saved Search',
  WISH_LIST: 'Favourites',
  LISTINGS: 'Listings',
  PROFILE: 'Profile',
};

export const newsStatuses = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
  DELETED: 3,
};

export const classifyStatuses = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
  ARCHIVED: 3,
};

export const statusesOfHorseAdminView = {
  PENDING: 1,
  REJECTED: 5,
  DELETED: 6,
};

export const statusesOfHorseVendorView = {
  PENDING: 1,
  DRAFT: 2,
  SOLD: 3,
  ARCHIVED: 4,
  REJECTED: 5,
  DELETED: 6,
};

export const typeListNoSyndication = [
  {
    id: 1,
    type: 'For Sale',
  },
  {
    id: 2,
    type: 'For Lease',
  },
];

export const typeRequest = [
  {
    id: 1,
    type: 'Horse Listing - $99 for six months',
  },
  {
    id: 2,
    type: 'Priority Placement Horse Listing Upgrade - $99/month anytime',
  },
  {
    id: 3,
    type: 'Business Listing - FREE',
  },
  {
    id: 4,
    type: 'Business Listing plus Tile Ad - $250/month',
  },
  {
    id: 5,
    type: 'Business Listing plus Banner Ad - $500/month',
  },
  {
    id: 6,
    type: 'Business Listing plus Everywhere Tile Ad - $750/month',
  },
];
export const typeRequestPurchaser = [
  {
    type: 3,
    description: 'Business Listing - FREE',
  },
  {
    type: 4,
    description: 'Business Listing plus Tile Ad - $250/month',
  },
  {
    type: 5,
    description: 'Business Listing plus Banner Ad - $500/month',
  },
  {
    type: 6,
    description: 'Business Listing plus Everywhere Tile Ad - $750/month',
  },
];

export const typeRequestCustorm = [
  {
    id: 3,
    type: 'Business Listing - FREE',
  },
  {
    id: 4,
    type: 'Business Listing plus Tile Ad - $250/month',
  },
  {
    id: 5,
    type: 'Business Listing plus Banner Ad - $500/month',
  },
  {
    id: 6,
    type: 'Business Listing plus Everywhere Tile Ad - $750/month',
  },
];

export const statusClassified = [
  {
    id: 0,
    name: 'Pending',
  },
  {
    id: 1,
    name: 'Approved',
  },
  {
    id: 2,
    name: 'Rejected',
  },
  {
    id: 3,
    name: 'Archived',
  },
];

export const pageClassified = [
  {
    id: 0,
    name: 'Home Page',
  },
  {
    id: 1,
    name: 'Sale',
  },
  {
    id: 2,
    name: 'Lease',
  },
  {
    id: 3,
    name: 'Syndication',
  },
  {
    id: 4,
    name: 'News',
  },
];

export const positionClassified = [
  {
    id: 0,
    name: 'Banner',
  },
  {
    id: 1,
    name: 'Tile',
  },
  {
    id: 2,
    name: 'News Tile',
  },
];

export const DateType = {
  SHORT_DATE_1: 'D/M/YYYY', // 1/1/2020
  SHORT_DATE_2: 'DD/MM/YYYY', // 01/01/2020
  SHORT_DATE_3: 'DD/MM/YY', // 01/01/20
  LONG_DATE_1: 'MMM D, YYYY', // Jan 1, 2020
  LONG_DATE_2: 'DD MMM YYYY', // 01 Jan 2020
  FULL_DATE_1: 'ddd, MMM D, YYYY', // Wed, Jan 1, 2020
  FULL_DATE_2: 'dddd, MMMN D, YYYY', // Wednesday, January 1, 2020
  FULL_DATE_3: 'D MMM YYYY', // Wed 1 Jan 2020
  FULL_DATE_4: 'dddd D MMMM YYYY', // Wednesday 1 January 2020
  MONTH_DAY_1: 'MMM D', // Jan 1
  MONTH_DAY_2: 'MMMM D', // January 1
  YEAR_MONTH_1: 'MMM YYYY', // Jan 2020
  YEAR_MONTH_2: 'MMMM YYYY', // January 2020
  SHORT_TIME_1: 'H:mm a', // 1:01 am
  SHORT_TIME_2: 'HH:mm', // 01:01 am
  SHORT_TIME_3: 'H:mm A', // 1:01 AM
  SHORT_TIME_4: 'HH:mm A', // 01:01 AM
  SHORT_TIME_5: 'HH:mm', // 01:01 AM
  LONG_TIME_1: 'H:mm:ss a', // 1:01:01 am
  LONG_TIME_2: 'HH:mm:ss a', // 01:01:01 am
  LONG_TIME_3: 'H:mm:ss A', // 1:01:01 AM
  LONG_TIME_4: 'HH:mm:ss A', // 01:01:01 AM
  MOMENT_DATE_FORMAT: 'YYYY-MM-DD', // 2020-01-01
  CURRENT_DATE_FORMAT: 'HH:mm D MMM YYYY', // 2020-01-01
};

export enum STATUS_COLOR {
  'orange',
  'Green',
  '#37ccc0',
  'Crimson',
  'darkseagreen',
}

export const HorseType = {
  SALE: 1,
  LEASE: 2,
  SYNDICATION: 3,
};

export const QueryParam = {
  orderBy: 'publishedDate',
  orderDirection: 'desc',
  pageSize: 5,
  pageIndex: 0,
};

export const orderByList = [
  {
    id: 0,
    orderBy: 'publishedDate',
    orderDirection: 'desc',
    name: 'Newest to Oldest date',
    image: '/assets/images/icons/arrown-date-down.png',
  },
  {
    id: 1,
    orderBy: 'publishedDate',
    orderDirection: 'asc',
    name: 'Oldest to Newest date',
    image: '/assets/images/icons/arrown-date-up.png',
  },
  { id: 2, orderBy: 'name', orderDirection: 'asc', name: 'A to Z', image: '/assets/images/icons/arrown-name-up.png' },
  {
    id: 3,
    orderBy: 'name',
    orderDirection: 'desc',
    name: 'Z to A',
    image: '/assets/images/icons/arrown-name-down.png',
  },
  {
    id: 4,
    orderBy: 'price',
    orderDirection: 'asc',
    name: ' Lowest to Highest price',
    image: '/assets/images/icons/arrown-price-up.png',
  },
  {
    id: 5,
    orderBy: 'price',
    orderDirection: 'desc',
    name: 'Highest to Lowest price',
    image: '/assets/images/icons/arrown-price-down.png',
  },
];

export const orderByShortList = [
  {
    id: 0,
    orderBy: 'publishDate',
    orderDirection: 'desc',
    name: 'Newest to Oldest date',
    image: '/assets/images/icons/arrown-date-down.png',
  },
  {
    id: 1,
    orderBy: 'publishDate',
    orderDirection: 'asc',
    name: 'Oldest to Newest date',
    image: '/assets/images/icons/arrown-date-up.png',
  },
];
