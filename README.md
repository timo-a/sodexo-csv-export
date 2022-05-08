# Sodexo csv export
adds the a button to download transactions on https://www.mysodexocard.de/transaktionen/ as csv file.

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