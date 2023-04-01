app.get('/logout', (req, res) => {
    // clear any user session data
    // redirect to the login page
    res.redirect('/login');
  });