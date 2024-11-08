const { app, protocol, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const createWindow = () => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const parsedUrl = url.parse(request.url); // Parse the URL
    const pathname = decodeURIComponent(parsedUrl.pathname.substr(1)); // Strip off the leading '/' and decode URL components
    const query = parsedUrl.query; // Extract the query parameters if needed

    // Here you can handle the query parameters (if any)
    console.log('Query parameters:', query); // Example: log the query

    // Resolve the file path
    const normalizedPath = path.normalize(`${__dirname}/${pathname}`);

    callback({ path: normalizedPath });
  });

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: true,
    icon: path.join(__dirname, 'favicon.ico'),
    webPreferences: {
      nodeIntegration: false, // Enable Node.js integration if necessary
      contextIsolation: false, // Disable context isolation to use Node.js in the renderer process
      webSecurity: false
    }
  })


  win.removeMenu();
  //win.loadFile('/index.html');

  //win.loadURL(`file:///index.html?dark=1`);
  //win.loadURL(path.normalize(`/index.html`));
  //win.loadFile('/index.html');

  win.loadURL('file:///index.html');
  //win.loadURL(`file://${__dirname}/index.html`)
}

app.whenReady().then(() => {
  createWindow()
})


app.on("browser-window-created", (e, win) => {
    win.removeMenu();
});