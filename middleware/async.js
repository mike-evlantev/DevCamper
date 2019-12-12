// Taken from https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware/

// The asyncHandler receives a function and returns a function with three input params. This new function is responsible to executes the original function passing the three params and catching any error.

// BEFORE:
// app.get('/hello', async (req, res, next) => {
//    try {
//      // Some code here.
//    } catch (error) {
//      // Some error handling here.
//    }
// });

// AFTER:
// app.get('/hello', asyncHandler(async (req, res, next) => {
//   // Some code here. Any error will be cought and passed to expressjs
// }) );

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
