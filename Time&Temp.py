#!/usr/bin/python

import smbus
import time
import sys
import datetime

i2c = smbus.SMBus(1)
address = 0x48


block = i2c.read_i2c_block_data(address, 0x00, 2)
temp = (block[0] << 8 | block[1]) >> 3

if(temp >= 4096):
 temp -= 819
temp = temp * 0.0625

d = datetime.datetime.today()
dt = d.strftime("%Y%m%d")
tm = d.strftime("%H%M%S")

disp = str(dt) + "," + str(tm) + "," + str(temp) + ",\n"

print disp

