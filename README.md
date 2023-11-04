# drumstix42.github.io

# Icarus Calculator
This is a web-based calculator tool for the survival game [Icarus](https://store.steampowered.com/app/1149460/ICARUS/). It is designed to be used as a companion tool while playing the game. It is written in [Vue.js](https://vuejs.org/) and deployed using [GitHub Pages](https://pages.github.com/).

## Running Project
If this is your first time see [Setting up Dev Environment](#setting-up-dev-environment)

Otherwise, run
```
nvm use
yarn install
yarn dev
```
## Updating Project files
### Extracting Item Icons
- Download [Ue4Export](https://github.com/CrystalFerrai/Ue4Export/releases) tool
- Copy the `scripts/Ue4ExportFiles/*` files into the directory which you extracted the `Ue4Export` tool (Sibling of Ue4Export.exe).
- Adjust the `export.bat` file to point to your game directory.
- Execute `export.bat` from within the `UeExport` directory.
- This will produce both the json data files, as well as the image assets.

### Updating Via script
You can Update the web app's game assets via running the yarn script: `yarn update-game-assets <path/to/Ue4ExportDir/export>` produced by the `export.bat` file in the step above.

### Updating Data files
Once you have extracted the JSON data files, you will need to copy them over from the game directory folder(s) matching the table mapping shown below. 

JSON files for the Web App are located in: [public/icarus-game/Data](./public/icarus-game/Data) and are used to calculate recipes on initial page load.
| Web File                | Icarus Data Export location                          |
|-------------------------|------------------------------------------------------|
| D_ItemsStatic.json      | `%UE4ExportFolder%\Items\D_ItemsStatic.json`         |
| D_ItemTemplate.json     | `%UE4ExportFolder%\Items\D_ItemTemplate.json`        |
| D_Itemable.json         | `%UE4ExportFolder%\Traits\D_Itemable.json`           |
| D_ProcessorRecipes.json | `%UE4ExportFolder%\Crafting\D_ProcessorRecipes.json` |

### Updating Item Icons
The Web App base directory is `public\icarus-game\ItemIcons`, and the extracted data is `export\Icarus\Content\Assets\2DArt\UI\Items\Item_Icons`. You can simply copy all images and folders over to update them.

**NOTE:** The `.gitignore` file handles known image filenames which were/are too long. Simply removing the duplicated text in the file name, and manually setting them was enough to fix the issue, as the code is setup to handle partial matches as-is.

### Updating the Web App

Once the data and image files are updated, the remaining adjustments are done within the `src\pages\Icarus.vue` file. Here we can specify the game version and the calendar date, the update notes link and week number, and the welcome/changes banner texts.


## Setting up Dev Environment
### NVM (Node Version Manager)
- Follow the instructions at [github/nvm-sh](https://github.com/nvm-sh/nvm) to install nvm
- Then run: `nvm install` or `nvm use`
### Yarn
- Before you can run yarn, you should enable: `corepack enable` which then will automatically install yarn when you run the command to the version of the repository.  See [yarnpkg install instructions](https://yarnpkg.com/getting-started/install).
- Run `yarn install` to install the dependencies.
- Ensure `yarn build` executes without a problem.