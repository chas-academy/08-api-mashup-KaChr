# 08-api-mashup-KaChr
http://karinchristensen.chas.academy/08-api-mashup

### Deploy instructions
1. Build the project in production mode with webpack: ```webpack --env=prod```
2. Run the deploy script: ```./deploy live go``` (this requires rsync to be installed, is available in ubuntu for windows)
3. Will prompt for user password, update `deploy.sh` to match your ssh username and path on your hosting provider.
3. Take a break
4. Visit the production URL

### Re-deploy instructions
See above