#!/bin/bash

$ERRORSTRING="Något gick åt skogen. Kolla så parametrarna som skickas in är rätt"
if [ $# -eq 0 ]
    then
        echo $ERRORSTRING;
elif [ $1 == "live" ]
    then
        if [[ -z $2 ]]
            then
                echo "Testkörning (inget händer)"
                rsync --dry-run -az --force --delete --progress --exclude-from=rsync_exclude.txt -e "ssh -p22" ./ 226753_kachr@ssh.binero.se:/storage/content/53/226753/karinchristensen.chas.academy/public_html/08-api-mashup-KaChr
        elif [ $2 == "go" ]
            then
                echo "Kör den riktiga deployen"
                rsync -az --force --delete --progress --exclude-from=rsync_exclude.txt -e "ssh -p22" ./ 226753_kachr@ssh.binero.se:/storage/content/53/226753/karinchristensen.chas.academy/public_html/08-api-mashup-KaChr
        else
            echo $ERRORSTRING;
        fi
fi