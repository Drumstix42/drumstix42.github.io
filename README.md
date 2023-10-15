# drumstix42.github.io

## Running Project
If this is your first time see [Setting up Dev Environment](#setting-up-dev-environment)

Otherwise, run
```
nvm use
yarn install
yarn dev
```
## Updating Data files
### Installation
- Follow The [Icarus Mod Manager Set up instructions](#icarus-mod-manager)
### Extraction of Data files
- Using the Icarus Mod Manager, extract `%STEAMFOLDER%\steamapps\common\Icarus\Icarus\Content\Data\data.pak`.
#### Data files
All Web files are in: [public/icarus-game/Data](./public/icarus-game/Data).
| Web File                | Icarus Data File                                     |
|-------------------------|------------------------------------------------------|
| D_ItemsStatic.json      | `%MODMANAGER%\data\Items\D_ItemsStatic.json`         |
| D_Itemable.json         | `%MODMANAGER%\data\Traits\D_Itemable.json`           |
| D_ItemTemplate.json     | `%MODMANAGER%\data\Items\D_ItemTemplate.json`        |
| D_ProcessorRecipes.json | `%MODMANAGER%\data\Crafting\D_ProcessorRecipes.json` |
#### Item Icons
Honestly I don't know how this was originally generated.
How I found the same data:
- Following the instructions I found while searching the modding discord: This response: [Instructions to get assets](https://discordapp.com/channels/936621749733302292/936699865730281482/937183606890168340)
- Download [FModel](https://github.com/4sval/FModel)

#### Updating this project data files
Once you have extracted the data required (via the instructions above), you should have a directory that contains the `*.json` files mentioned in the table, as well as a directory containing all of the `png` files (in the same basic structure as the web app).  The difference is the Web App calls the base directory `ItemIcons`, and the extracted data has it as `Item_Icons`.

There is a script that manages locating, and copying the required files to updated called [scan-assets.mjs](./scripts/scan-assets.mjs).

This script will copy over all of the json data files, then utilizing the `D_Itemable.json` file, and the input directory arguments, to copy over all of the
required image assets.  It will also remove any image assets that are no longer referenced in `D_Itemable.json`.  

This scripts usage thus is:

```
cd scripts
node scan-assets.mjs /path/to/Output/Exports/Icarus/Content/Assets/2DArt/UI/Items/Item_Icons /path/to/IcarusModManager/data/
```

Where `/path/to/Output/Exports/Icarus/Content/Assets/2DArt/UI/Items/Item_Icon` contains the same files as [./public/icarus-game/ItemIcons/](./public/icarus-game/ItemIcons/) and `/path/to/IcarusModManager/data/`  contains the file tree as described by the 'Data Files' table.

## Setting up Dev Environment
### NVM (Node Version Manager)
- Follow the instructions at [github/nvm-sh](https://github.com/nvm-sh/nvm) to install nvm
- Then run: `nvm install` or `nvm use`
### Yarn
- Before you can run yarn, you should enable: `corepack enable` which then will automatically install yarn when you run the command to the version of the repository.  See [yarnpkg install instructions](https://yarnpkg.com/getting-started/install).
- Run `yarn install` to install the dependencies.
- Ensure `yarn build` executes without a problem.
### Icarus Mod Manager
- Optional: You will need to grab the [Icarus Mod Manager](https://github.com/Jimk72/Icarus_Software) in order to update the data tables.
