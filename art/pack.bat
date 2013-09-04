cd %~dp0
set TexturePacker="C:\Program Files (x86)\CodeAndWeb\TexturePacker\bin\TexturePacker.exe"
set OutputPath=..\ShadowWalker\res\HD
set Params=--algorithm Basic --trim-mode None --format cocos2d --basic-sort-by Best --max-size 2048 --size-constraints POT --pack-mode Best
for /f %%i in ('dir /ad/b') do (
	%TexturePacker% %%i/ --data %OutputPath%\%%i.plist --sheet %OutputPath%\%%i.png %Params%
	)