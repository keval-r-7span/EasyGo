import { App } from '../app';

describe('the app', () => {
  it('says hello', () => {
    expect(new App().message).toBe('🚀 Server is running.. on http://localhost:${PORT}🚀..');
  });
});