nexe index.mjs -b --output textlint.exe

// onefile でコンパイル
// index.mjs が不在だとエラーになるので注意
nexe index.mjs -b --output textlint.exe --resource='./node_modules/'
