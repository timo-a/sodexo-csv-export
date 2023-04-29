:headstone: This repository is no longer maintained because I no longer use a sodexo card :headstone:

# Sodexo csv export
adds a button to download transactions on https://www.mysodexocard.de/transaktionen/ as csv file.

<a href="https://addons.mozilla.org/en-US/firefox/addon/sodexo-csv-export/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get uBlock Origin for Firefox"></a>

## How to build it

 - `npm install`
 - `npm run build`

## How to package it
 - `rm sodexo-csv-export.zip`
 - `cd addon`
 - `zip -r -FS ../sodexo-csv-export.zip *`

## How to package the source
 - (`cd ..`) //back to top level
 - `rm ../sodexo-csv-export-source.zip`
 - `zip -r -FS ../sodexo-csv-export-source.zip * --exclude sodexo-csv-export.zip --exclude node_modules`
