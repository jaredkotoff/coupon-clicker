/* Temp file */

import { Page } from 'puppeteer';

export interface Site {
  name: string;
  run: (page: Page, email: string, password: string) => Promise<void>;
}
