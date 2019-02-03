#!/bin/bash
sudo apt-get update
sudo apt-get upgrade -y


#Activation SSH
#sudo touch /boot/ssh

#Activation IIC
sudo sed -i -e "6i i2c-bcm2708" /etc/modules
sudo sed -i -e "$ a dtparam=i2c_arm=on" /boot/config.txt
sudo apt-get install python-smbus
sudo apt-get install i2c-tools

#Install node 4.2.4
sudo git clone git://github.com/creationix/nvm.git ~/.nvm
sudo chmod 777 ~/.nvm
source ~/.nvm/nvm.sh
nvm install 4.2.4

sudo apt-get install -y npm
#sudo npm cache clean
#sudo npm install npm n -g
#sudo n stable

#install socket.io
cd ./.nvm/versions/node/v4.2.4/lib/node_modules
npm install -g socket.io@1.7.3

#MAKE PATH
export NODE_PATH=/home/pi/.nvm/versions/node/v4.2.4/lib/node_modules

#install LMS file
sudo git clone git://github.com/isapanda/LMS.git /home/LMS



