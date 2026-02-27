@echo off
:: Please note the filepath needs to be updated to your game installation folder
:: Tested with Ue4Export v4.2.1 (https://github.com/CrystalFerrai/Ue4Export/releases)
:: Icarus uses UE4_27
Ue4Export.exe "C:\Games\Steam\steamapps\common\Icarus\Icarus\Content\Paks" UE4_27 assetlist.txt export
Ue4Export.exe "C:\Games\Steam\steamapps\common\Icarus\Icarus\Content\Data" UE4_27 assetlist_data.txt export/data

for /D %%G in (export\data\*) do move %%G export
rmdir export\data

pause