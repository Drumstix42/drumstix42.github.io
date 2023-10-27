# drumstix42.github.io

## Running Project
If this is your first time see [Setting up Dev Environment](#setting-up-dev-environment)

Otherwise, run
```
nvm use
yarn install
yarn dev
```
## Updating Project files
### Extracting Data files
- Using the [Icarus Mod Manager](https://github.com/Jimk72/Icarus_Software) or [DRGPacker2](https://drive.google.com/file/d/1f8J_2A0GgDIAU6Ekq7Ef6GELnpHpK8wT/view) extract `%STEAMFOLDER%\steamapps\common\Icarus\Icarus\Content\Data\data.pak`.
    - For more information on DRGPacker, join the **Linkarus - ICARUS modding** Discord, and see the list of mod tools in this channel: https://discord.com/channels/936621749733302292/936699865730281482
### Updating Data files
Once you have extracted the JSON data files, you will need to copy them over from the game directory folder(s) matching the table mapping shown below. 

JSON files for the Web App are located in: [public/icarus-game/Data](./public/icarus-game/Data) and are used to calculate recipes on initial page load.
| Web File                | Icarus Data File                                     |
|-------------------------|------------------------------------------------------|
| D_ItemsStatic.json      | `%MODMANAGER%\data\Items\D_ItemsStatic.json`         |
| D_Itemable.json         | `%MODMANAGER%\data\Traits\D_Itemable.json`           |
| D_ItemTemplate.json     | `%MODMANAGER%\data\Items\D_ItemTemplate.json`        |
| D_ProcessorRecipes.json | `%MODMANAGER%\data\Crafting\D_ProcessorRecipes.json` |

### Extracting Item Icons
- Download [Ue4Export](https://github.com/CrystalFerrai/Ue4Export/releases) tool
- Adjust the `export.bat` file to point to your game directory
- Adjust `assetlist.txt` so that `[Texture]` section only includes `Icarus/Content/Assets/2DArt/*`
    - you can simply prefix each line with a `#` to comment out the line *(unless you want to export other assets)*
- Adjust `assetlist_data.txt` and comment out everything *(unless you want to export other assets)*

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