var BrowserWindow = require('browser-window')
var app = require('app')
var httpServer = require('serves')
var cwd = __dirname

app.commandLine.appendSwitch('disable-http-cache')
app.on('ready', function () {
  var window = new BrowserWindow({
    width: 0, height: 0
  })

  // creates a local server on 8080
  // that serves HTML + JS
  httpServer({
    cwd: cwd,
    index: 'index.html',
    entry: 'index.js'
  }, function (err, ev) {
    if (err) throw err
    window.webContents.once('did-start-loading', function () {
      window.openDevTools({ detach: true })
    })

    window.show()

    // this works, it resolves './foo.js'
    // window.loadUrl('file://' + __dirname + '/index.html')

    // this is not able to resolve './foo.js'
    window.loadUrl(ev.url)
  })
})
