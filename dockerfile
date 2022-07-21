FROM node:16

ENTRYPOINT ["npm", "update", "npm", "install", "lsof"]