// login.test.js

const { login } = require('./userlogin');

jest.mock('./userlogin', () => ({
  generateAuthToken: jest.fn(() => 'mockedAuthToken'),
}));

describe('login function', () => {
  let originalFetch;
  let originalAlert;
  let originalLocationHref;

  beforeEach(() => {
    // Save the original implementations of fetch, alert, and window.location.href
    originalFetch = global.fetch;
    originalAlert = global.alert;
    originalLocationHref = global.window ? global.window.location.href : '';

    // Mock fetch globally
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ id: 'mockedUserId', password: 'mockedPassword', role: 'user', email: 'user@example.com' }]),
    }));

    // Mock alert globally
    global.alert = jest.fn();

    // Mock window.location.href globally
    if (!global.window) {
      global.window = {};
    }
    global.window.location = { href: '' };
  });

  afterEach(() => {
    // Restore the original implementations after each test
    global.fetch = originalFetch;
    global.alert = originalAlert;
    if (global.window) {
      global.window.location.href = originalLocationHref;
    }
  });

  test('should login successfully with correct credentials', async () => {
    // Arrange
    document.getElementById = jest.fn((id) => {
      if (id === 'loginId') return { value: 'mockedUserId' };
      if (id === 'loginPassword') return { value: 'mockedPassword' };
    });

    // Act
    await login();

    // Assert
    expect(document.getElementById).toHaveBeenCalledWith('loginId');
    expect(document.getElementById).toHaveBeenCalledWith('loginPassword');
    expect(global.fetch).toHaveBeenCalledWith(`${apiUrl}`, { method: 'GET' });
    expect(alert).toHaveBeenCalledWith('Login Successful');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('loggedInUser', '{"id":"mockedUserId","password":"mockedPassword","role":"user","email":"user@example.com"}');
    expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'mockedAuthToken');
    expect(window.location.href).toBe('userpage.html');
  });

  // Add more tests for other scenarios
});
