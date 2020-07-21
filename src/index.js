const App = require('./app')

App.getApp().then(app => {
  app.listen(3000)
  console.log(`App listening on ${3000}`)
})
