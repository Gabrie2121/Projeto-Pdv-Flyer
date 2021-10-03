const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process');
const path = require('path')
var execfile = require('child_process').execFile;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "GNJ Sys",
    frame: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setMenu(null)

  win.loadFile('./src/login.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', function () {
  
  exec('taskkill /f /t /im app.exe', (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });

  if (process.platform !== 'darwin') app.quit()
})

let backend;
backend = path.join(process.cwd(), 'backend/app/app.exe')

execfile(
  backend,
  {
    windowsHide: true,
  },
  (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }
    if(stdout){
      console.log(stdout)
    }
    if (stderr) {
      console.log(stderr)
    }
  }
)