// Executed before runnign tests.
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Mock localstorage for use with mocking browser api
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;


const books = [
  {
    author: 'Mary changes',
    book_code: 978922433901,
    book_id: 15,
    ddc_code: '400',
    genre: 'non-fiction',
    sub_genre: 'NA',
    synopsis: 'Pef ohew ouweq...',
    title: 'Dreams on everything',
  },
  {
    author: 'Another one',
    book_code: 981654398561,
    book_id: 12,
    ddc_code: '400',
    genre: 'non-fiction',
    sub_genre: 'NA',
    synopsis: '',
    title: 'Notification check',
  },
];

global.books = books;
