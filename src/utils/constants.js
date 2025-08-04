// Import SVG icons
import AdventureIcon from '../assets/Adventure.svg';
import DramaIcon from '../assets/Drama.svg';
import FictionIcon from '../assets/Fiction.svg';
import HistoryIcon from '../assets/History.svg';
import HumourIcon from '../assets/Humour.svg';
import PhilosophyIcon from '../assets/Philosophy.svg';
import PoliticsIcon from '../assets/Politics.svg';

export const API_BASE_URL = 'http://skunkworks.ignitesol.com:8000';

export const GENRES = [
  { name: 'FICTION', icon: FictionIcon, topic: 'fiction' },
  { name: 'DRAMA', icon: DramaIcon, topic: 'drama' },
  { name: 'HUMOR', icon: HumourIcon, topic: 'humor' },
  { name: 'POLITICS', icon: PoliticsIcon, topic: 'politics' },
  { name: 'PHILOSOPHY', icon: PhilosophyIcon, topic: 'philosophy' },
  { name: 'HISTORY', icon: HistoryIcon, topic: 'history' },
  { name: 'ADVENTURE', icon: AdventureIcon, topic: 'adventure' }
];

export const BOOK_FORMATS = {
  HTML: 'text/html',
  PDF: 'application/pdf', 
  TXT: 'text/plain'
};

export const FORMAT_PRIORITY = ['HTML', 'PDF', 'TXT'];