#!/bin/bash

cd /home/kroko/wedding-spa/frontend/
PATH="/home/kroko/.nvm/versions/node/v17.5.0/bin:$PATH"
ORIGIN=https://brandts.wedding node build
