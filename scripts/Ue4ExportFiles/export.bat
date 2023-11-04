@echo off
:: Please note the filepath needs to be updated to your game installation folder
Ue4Export.exe "C:\Games\Steam\steamapps\common\Icarus\Icarus\Content\Paks" assetlist.txt export
Ue4Export.exe "C:\Games\Steam\steamapps\common\Icarus\Icarus\Content\Data" assetlist_data.txt export/data

for /D %%G in (export\data\*) do move %%G export
rmdir export\data