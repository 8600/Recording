import {app, Menu, shell, ipcMain, Notification} from 'electron';

import {checkForUpdates} from './auto-updater';

const checkForUpdatesItem = {
  label: '检查更新',
  click(item) {
    item.enabled = false;
    checkForUpdates(() => {
      // This will be called if no update is available
      (new Notification({
        title: '已经是最新版本!',
        body: 'You will automatically receive updates as soon as they are available 🤗'
      })).show();
    });
  }
};

const cogMenu = [
  {
    role: 'about'
  },
  {
    type: 'separator'
  },
  {
    label: '偏好设置',
    accelerator: 'Cmd+,',
    click() {
      app.kap.openPrefsWindow();
    }
  },
  {
    type: 'separator'
  },
  checkForUpdatesItem,
  {
    type: 'separator'
  },
  {
    role: 'quit',
    accelerator: 'Cmd+Q'
  }
];

const applicationMenu = [
  {
    label: app.getName(),
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: '偏好设置',
        accelerator: 'Cmd+,',
        click() {
          app.kap.openPrefsWindow();
        }
      },
      checkForUpdatesItem,
      {
        type: 'separator'
      },
      {
        label: '贡献人员',
        click: () => shell.openExternal('https://github.com/wulkano/kap')
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  },
  {
    label: '文件',
    submenu: [
      {
        label: '新建录制',
        accelerator: 'CmdOrCtrl+N',
        click(item, focusedWindow) {
          focusedWindow.webContents.send('prepare-recording');
        }
      },
      {
        type: 'separator'
      },
      {
        type: 'separator'
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        click(item, focusedWindow) {
          if (focusedWindow) {
            if (focusedWindow === app.kap.editorWindow) {
              ipcMain.emit('close-editor-window');
              return;
            }

            focusedWindow.hide();
          }
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: '视图',
    submenu: [
      {
        label: '重新录制',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        }
      },
      {
        label: '开始调试',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) {
            if (focusedWindow.isDevToolsOpened()) {
              focusedWindow.closeDevTools();
            } else {
              focusedWindow.openDevTools({mode: 'detach'});
            }
          }
        }
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Kap Website',
        click: () => shell.openExternal('https://getkap.co')
      },
      {
        label: 'GitHub repository',
        click: () => shell.openExternal('https://github.com/wulkano/kap')
      }
    ]
  }
];

exports.applicationMenu = Menu.buildFromTemplate(applicationMenu);
exports.cogMenu = Menu.buildFromTemplate(cogMenu);
