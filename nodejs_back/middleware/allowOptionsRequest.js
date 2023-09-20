function allowOptionsRequests(req, res, next) {
    if (req.method === 'OPTIONS') {
      // Respond to OPTIONS requests without authentication
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Content-Type': 'text/plain', // Set an appropriate Content-Type for OPTIONS response
      });
      res.status(200).end();
    } else {
      next(); // Continue to other routes for non-OPTIONS requests
    }
  }


  module.exports = allowOptionsRequests;