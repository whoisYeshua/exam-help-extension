# Exam Help Extension

An extension that allows to simplify the interaction of the examiner and his assistant during the exam. Outwardly, it disguises itself as an Adblock, so as not to cause suspicion.

The screenshot is sent to your discord server (imgur is used for screenshots hosting).

You will receive answers from your smart watch or phone, this extension does not provide reverse feedback.

## Example

![Imgur](https://i.imgur.com/Z6pvVNf.gif)

## Features

- Masquerading as Adblock
- Discord Support
- Stealthy management with "Z" key

## Requirements

- `Node.js` - you can download it from [official site](http://nodejs.org/en/). It will be required to run the building script. You can check the installed version by writing the command `node -v` in your terminal.
- `npm` - it should be installed together with Node.js. Will be required to install the modules. You can check the installed version by writing the command `npm -v` in your terminal
- `git` - not required, but it will allow you to download the repo in one command

## Installation

1. Download repo and open folder

```bash
git clone https://github.com/whoisYeshua/exam-help-extension.git
cd exam-help-extension
```

2. Install dependencies

```bash
npm install
```

3. Configure `config.js`

_This is an important step, since in the subsequent stages you will not be able to configure your keys to access the imgur and Discord API. This is done so that the extension can be quickly deployed in a tense situation, therefore, there are no fields for entering this data in the extension itself_

[How to get Webhook URL](https://help.dashe.io/en/articles/2521940-how-to-create-a-discord-webhook-url), _note, that you should create your own discord server_

[How to get imgur Client ID](https://compile.blog/imgur-api-image-uploader/), _pay attention at Step 1 in this article, we only need the Client ID_

Paste the received values into the corresponding fields of the file `config.js`. _Do not confuse the `config` folder with the file `config.js` (The folder is needed to build our extension via Webpack, and the file is needed to access the services API)_

```js
export const config = {
  discordWebhookUrl: 'YOUR_DISCORD_WEBHOOK_URL_SHOULD_BE_HERE',
  imgurClientId: 'YOUR_IMGUR_APPLICATION_CLIENT_ID_SHOULD_BE_HERE',
}
```

4. Build extension

Now we need to build an extension to get a production version

```bash
npm run build
```

**After using this command, the build folder should appear. It is this folder that we will connect in Chrome as our extension**

5. Install extension

[How to Install a Chrome Extension - Guide](https://www.thesslstore.com/blog/install-a-chrome-extension/)

## Usage

Extension has two states:
| Status | Badge | Description |
| ------------------------ | ------------------- | --------------------------- |
| ON | ![ON](https://i.imgur.com/z8vso6Z.png) | The extension listens all tabs in anticipation of pressing Z |
| OFF | ![OFF](https://i.imgur.com/JRDFzVa.png) | The extension doesn't listen anything |

The first time you enable the extension, it will be in the OFF state.
After you click on the extension icon, a popup window will appear, in it, you can change the states of the extension.

When the extension switches to the ON state, all tabs that are already open or will be open will be waiting for pressing Z key, which will start the process of creating and uploading a screenshot, as well as sending it to Discord. It doesn't matter what keyboard layout you have, since the extension uses `event.code` instead of `event.key`.

_For example, here are US layout (“QWERTY”) and German layout (“QWERTZ”) under it (from Wikipedia):_
![event_code](https://i.imgur.com/qLGM034.jpg)
_For the same key, US layout has “Z”, while German layout has “Y” (letters are swapped)._

_Literally, `event.code` will equal KeyZ for people with German layout when they press Y._

_If we check `event.code == 'KeyZ'` in our code, then for people with German layout such test will pass when they press Y._ [- more about this](https://javascript.info/keyboard-events)

## Contribution

Suggestions and pull requests are welcomed!

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)
