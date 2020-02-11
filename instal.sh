#!/bin/bash
sudo apt-get update
sudo apt-get upgrade -y

#Install chkconfig
sudo apt-get install chkconfig -y

#Activation SSH
#sudo touch /boot/ssh

#Activation IIC
sudo sed -i -e "6i i2c-bcm2708" /etc/modules
sudo sed -i -e "$ a dtparam=i2c_arm=on" /boot/config.txt
sudo apt-get install python-smbus
sudo apt-get install i2c-tools

#install LMS file
sudo git clone git://github.com/isapanda/LMS.git /home/LMS
sudo mkdir /home/LMS/pict
sudo mv /home/LMS/mist.png /home/LMS/Pour.png /home/LMS/setting.png /home/LMS/Reload.png /home/LMS/temp.png /home/LMS/home.png /home/LMS/confirm.png /home/LMS/shutdown.png /home/LMS/pict

#Install node 8.11.1
sudo git clone git://github.com/creationix/nvm.git ~/.nvm
sudo chmod 777 ~/.nvm
source ~/.nvm/nvm.sh
nvm install 8.11.1

sudo apt-get install -y npm
#sudo npm cache clean
#sudo npm install npm n -g
#sudo n stable

npm init -y

#install socket.io
#cd ./.nvm/versions/node/v8.11.1/lib/node_modules
npm install -g socket.io@1.7.3

#install localtunnel
npm install -g localtunnel@1.9.1

#install forever & initd-forever
npm install -g forever initd-forever@0.1.8
#cd /home/LMS
initd-forever -a /home/LMS/index.js -n nodestart
chmod +x nodestart
sudo mv nodestart /etc/init.d

#SetUp Nodejs AutoStart
chkconfig nodestart --add
sudo chkconfig nodestart on
sudo service nodestart start


#MAKE PATH
sudo sed -i '$a export NODE_PATH=/home/pi/.nvm/versions/node/
v8.11.1/lib/node_modules' ~/.bashrc
source ~/.bashrc

#install LMS file
sudo git clone git://github.com/isapanda/LMS.git /home/LMS
sudo mkdir /home/LMS/pict
sudo mv mist.png Pour.png setting.png Reload.png temp.png home.png submit.png shutdown.png /home/LMS/pict

