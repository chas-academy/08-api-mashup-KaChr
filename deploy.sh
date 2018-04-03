#!/bin/bash
ERRORSTRING="Error. Please make sure you've indicated correct parameters"
if [ $# -eq 0 ]
    then
        echo "$ERRORSTRING";
elif [[ "$1"=="live" ]]
    then
        if [[ -z $2 ]]
            then
                echo "Testkörning (inget händer)"
                rsync --dry-run -azv --force --delete --progress --exclude-from=rsync_exclude.txt -e "ssh -p22" ./dist/ 226753_kachr@ssh.binero.se:/storage/content/53/226753/karinchristensen.chas.academy/public_html/08-api-mashup-KaChr
        elif [[ "$2"=="go" ]]
            then
                echo "Kör den riktiga deployen"
                rsync -azv --force --delete --progress --exclude-from=rsync_exclude.txt -e "ssh -p22" ./dist/ 226753_kachr@ssh.binero.se:/storage/content/53/226753/karinchristensen.chas.academy/public_html/08-api-mashup-KaChr
        else
            echo "$ERRORSTRING";
        fi
fi