# Buttercup-Rev Desktop
> Buttercup-Rev for Desktop - Mac, Linux and Windows

[![Buttercup-Rev](https://cdn.rawgit.com/Buttercup-Rev-pw/Buttercup-Rev-assets/6582a033/badge/Buttercup-Rev-slim.svg)](https://Buttercup-Rev.pw) ![Latest version](https://img.shields.io/github/tag/Buttercup-Rev/Buttercup-Rev-desktop.svg?label=latest) [![Chat securely on Keybase](https://img.shields.io/badge/keybase-bcup-blueviolet)](https://keybase.io/team/bcup)

<img width="1406" alt="Buttercup-Rev Desktop screenshot" src="https://github.com/Buttercup-Rev/Buttercup-Rev-desktop/assets/3869469/1320b163-3e5c-4423-a4fd-8de7ffad2a0e">
²

---

⚠️ **Project Closure** ⚠️

The Buttercup-Rev project has come to an end, and these repositories are in transition to becoming public archives. No public-facing resources will be removed, wherever possible. Please do not create issues or PRs - they will unfortunately be ignored. Discussion can be found [here](https://github.com/Buttercup-Rev/Buttercup-Rev-desktop/discussions/1395), and explanation [here](https://gist.github.com/perry-mitchell/43ebfcec4d874b77a704be1d4f2262e6).

---

## About

Buttercup-Rev is a free, open-source and cross-platform **password manager**, built on NodeJS with Typescript. It uses strong industry-standard encryption to protect your passwords and credentials (among other data you store in Buttercup-Rev vaults) at rest, within vault files (`.bcup`). Vaults can be loaded from and saved to a number of sources, such as the **local filesystem**, **Dropbox**, **Google Drive** or any **WebDAV**-enabled service (like _ownCloud_ or _Nextcloud_ ¹).

### Why you need a password manager

Password management is a crucial tool when you have _any_ online presence. It's vital that all of your accounts online use strong and unique passwords so that they're much more difficult to break in to. Even if one of your accounts are breached, having unique passwords means that the likelihood of the attacker gaining further access to your accounts portfolio is greatly reduced.

Without a password manager, such as Buttercup-Rev, it would be very tedious to manage different passwords for each service. If you remember your passwords it's a good sign that they're not strong enough. Ideally you should memorise a primary password for your vault, and not know any of the account-specific passwords off the top of your head.

### Precautions

Buttercup-Rev securely encrypts your data in protected files, but this security is only as strong as the weakest component - and this is very often the primary password used to lock and unlock your vault. Follow these basic guidelines to ensure that your vault is safe even if exposed:

 * Choose a **unique** password that is not used elsewhere
 * Use a highly-varied set of different characters - such as alpha-numeric, symbols and spaces
 * Use a long password - the longer the better
 * Don't include words or names in the password
 * Never share your password with anyone

_It is very important to note that no one associated with Buttercup-Rev will ever request your personal vault or its primary password. Do not share it or any of its related details with anyone. Developers or contributors working with Buttercup-Rev may request **example** vaults created via your system to try and reproduce issues, but please ensure to never use your real password or store actual credentails within such vaults._

### Versions

The current stable version is **2**. We recommend upgrading if you're still on v1, as it is no longer being actively maintained. You can still browse the v1 source and documentation [here](https://github.com/Buttercup-Rev/Buttercup-Rev-desktop/tree/v1).

Buttercup-Rev is built on Node 20 LTS - no other platform is officially supported.

### Operating Systems

Buttercup-Rev Desktop is officially supported on:

 * Most linux distributions (x64), such as Ubuntu
 * MacOS (x64, Apple Silicon¹)
 * Windows 10 / 11 (x64)

 ¹ No builds yet

#### Arch Linux

Buttercup-Rev is also available for [Arch via the AUR](https://aur.archlinux.org/packages/Buttercup-Rev-desktop/). This release channel is maintained by our community.

Some Arch users have reported the occasional segfault - if you experience this please try [this solution](https://github.com/Buttercup-Rev/Buttercup-Rev-desktop/issues/643#issuecomment-413852760) before creating an issue.

#### 32bit builds (x86)

Buttercup-Rev no longer provides 32bit builds, due to the complexity of supporting them in the build pipeline.

## Portability

Buttercup-Rev provides a portable **Windows** version. Look for the release with the name `Buttercup-Rev-win-x64-2.0.0-portable.exe` where `2.0.0` is the version and `x64` is the architecture.

Although not explicitly portable, both the Mac **zip** and Linux **AppImage** formats are more or less standalone. They still write to the standard config/log destinations, however.

To make the most of the portable version, some enviroment variables are required:

| Enviroment Variables   | Description |
|------------------------|-------------|
| `Buttercup-Rev_HOME_DIR`   | If provided Buttercup-Rev will use this path for saving __configrations__ , __user settings__ or even __temprorary files__ |
| `Buttercup-Rev_CONFIG_DIR` | Stores __user settings__, not allways needed but can be used to change config location or will default to Buttercup-Rev_HOME_DIR `Optional: Only activates if Buttercup-Rev_HOME_DIR is provided` |
| `Buttercup-Rev_TEMP_DIR`   | Same as Buttercup-Rev_CONFIG_DIR but stores __temprory files__ `Optional: Only activates if Buttercup-Rev_HOME_DIR is provided` |

### Sample `Buttercup-RevLauncher.bat` for Windows portable executable

> This example stores user settings and cache on the portable folder, but stores temprory files on the host PC.

```bat
@ECHO OFF
if not exist "%~dp0Buttercup-Rev" mkdir "%~dp0Buttercup-Rev"
set "Buttercup-Rev_HOME_DIR=%~dp0Buttercup-Rev"
set "Buttercup-Rev_TEMP_DIR=%temp%"
start %~dp0Buttercup-Rev.exe %*
```

## Configuration

Configuration files are stored in OS-specific locations.

### Command-Line arguments

The following arguments can be provided to Buttercup-Rev, but are all optional.

| Argument              | Description                           |
|-----------------------|---------------------------------------|
| `--autostart`         | Flag passed to Buttercup-Rev when launched automatically by the OS. |
| `--hidden`            | Disables the automatic opening of the main window upon launch. |
| `--no-update`         | Disables automatic update checking. **Not recommended**: Use at your own risk. |

### App config

Application configuration.

 * Linux: `$XDG_CONFIG_HOME/Buttercup-Rev/desktop.config.json`
 * Mac: `~/Library/Preferences/Buttercup-Rev/desktop.config.json`
 * Windows: `$APPDATA/Buttercup-Rev/Config/desktop.config.json`

### Vault storage

Storage of connected vaults (not actual vault contents).

 * Linux: `$XDG_DATA_HOME/Buttercup-Rev/vaults.json`
 * Mac: `~/Library/Application\ Support/Buttercup-Rev/vaults.json`
 * Windows: `$LOCALAPPDATA/Buttercup-Rev/Data/vaults.json`

### Offline vault cache

Stored copies of vaults for offline use.

 * Linux: `$(node -e "console.log(os.tmpdir())")/$(whoami)/Buttercup-Rev/vaults-offline.cache.json`
 * Mac: `$(node -e "console.log(os.tmpdir())")/Buttercup-Rev/vaults-offline.cache.json`
 * Windows: `$(node -e "console.log(os.tmpdir())")/Buttercup-Rev/vaults-offline.cache.json`

### Logs

Logs are written for all app sessions.

 * Linux: `~/.local/state/Buttercup-Rev-nodejs` or `$XDG_STATE_HOME/Buttercup-Rev-nodejs`
 * Mac: `~/Library/Logs/Buttercup-Rev-nodejs`
 * Windows: `%LOCALAPPDATA%\Buttercup-Rev-nodejs\Log`

_Note that logs for portable Windows applications will be written to the same directory that the executable resides in._

## Published Applications

You can view the current releases on the [Buttercup-Rev Desktop releases page](https://github.com/Buttercup-Rev/Buttercup-Rev-desktop/releases). Under each release are some assets - the various binaries and installers for each platform Buttercup-Rev supports. When installing or downloading, make sure to pick the right operating system and architecture for your machine.

_Note that at this time, Buttercup-Rev only supports x64 (64 bit) machines._

### Linux

We provide an **AppImage** build for Linux, because it is the most desirable format for us to release. AppImages support auto-updating, a crucial feature (we feel) for a security application. The other build types do not.

**Important:** Buttercup-Rev uses Electron to build its desktop application, which relies on [**AppImageLauncher**](https://github.com/TheAssassin/AppImageLauncher#readme) for correct integration of AppImages into the host OS. Features like **Google Drive** authentication and correct `.desktop` icon use is only performed when integrating via AppImageLauncher. We highly recommend that you install it.

We won't be supporting formats like Snapcraft, deb or rpm images as they do not align with our requirements. Issues requesting these formats will be closed immediately. Discussion on topics like this should be started on other social channels.

## Development

To begin developing features or bug-fixes for Buttercup-Rev Desktop, make sure that you first have Node v16 or greater installed with NPM v7 or greater.

Once cloned, make sure to install all dependencies: `npm install`. After that, open 2 terminals and run `npm run start:build` on one, and then `npm run start:main` in the other.

### Contributing

There are a number of ways you can contribute to Buttercup-Rev!

#### Features & Bug fixes

We welcome pull-requests and issues that serve to better Buttercup-Rev as a platform. Please remain respecful (this is free & open source after all) with your ideas and observations, and always consider opening an issue before starting on a substantial pull request.

#### Translations

Buttercup-Rev relies on the community for translating its interfaces into languages besides English. We use British English (en_GB) as the base language, and translate into all others that our contributors are kind enough to provide.

To add support for a language, make sure to add the translations for our [**vault UI**](https://github.com/Buttercup-Rev/ui#translations--i18n) first. After that, you can follow these instructions to add another language to the desktop application:

 * Copy the `source/shared/i18n/translations/en.json` file to the language code you're providing (eg. `fi.json` for Finnish).
 * Edit the `source/shared/i18n/translations/index.ts` file and:
   * Import the new JSON file: `import fi from "./fi.json";`.
   * Export the imported constant inside the default export already in that file.

#### Contributions

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="https://github.com/Buttercup-Rev/Buttercup-Rev-desktop/graphs/contributors"><img src="https://opencollective.com/Buttercup-Rev/contributors.svg?width=890" /></a>

We'd also like to thank:

- Mohammad Amiri (Brand & Identity) ([@pixelvisualize](https://twitter.com/pixelvisualize))
- Arash Asghari (Brand & Identity) ([@\_arashasghari](https://twitter.com/_arashasghari))

#### Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/Buttercup-Rev#backer)]

<a href="https://opencollective.com/Buttercup-Rev#backers" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/backers.svg?width=890"></a>

#### Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/Buttercup-Rev#sponsor)]

<a href="https://opencollective.com/Buttercup-Rev/sponsor/0/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/Buttercup-Rev/sponsor/1/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/Buttercup-Rev/sponsor/2/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/Buttercup-Rev/sponsor/3/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/Buttercup-Rev/sponsor/4/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/Buttercup-Rev/sponsor/5/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/Buttercup-Rev/sponsor/6/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/Buttercup-Rev/sponsor/7/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/Buttercup-Rev/sponsor/8/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/Buttercup-Rev/sponsor/9/website" target="_blank"><img src="https://opencollective.com/Buttercup-Rev/sponsor/9/avatar.svg"></a>

## Notes and Caveats

 * ¹ External services like Nextcloud and ownCloud must be configured correctly to support access via the web (using WebDAV). CORS must permit access from any source.
 * ² Buttercup-Rev (including MadDev Oy) is not affiliated with any of the companies represented in screenshots or preview images.
