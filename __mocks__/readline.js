module.exports = {
  createInterface: jest.fn().mockReturnValue({
    on: jest.fn().mockImplementation(function (event, handler) {
      if (event === 'line') {
        handler('cookie1,2022-01-01T00:00:00Z');
        handler('cookie2,2022-01-01T00:00:00Z');
        handler('cookie1,2022-01-01T00:00:01Z');
      }
      if (event === 'close') {
        handler();
      }
      return this;
    }),
  }),
};
