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

#address = 0x50
#block = i2c.read_i2c_block_data(address, 0x00, 1)
#adc = block[0]

#print("PSoC_DATA:%6.2f" % (temp / 16.0))

d = datetime.datetime.today()
dt = d.strftime("%Y%m%d")
tm = d.strftime("%H%M%S")
#csv = str(dt) + "," + str(tm) + "," + str(temp)  + ","+ str(adc) + ",\n"
csv = str(dt) + "," + str(tm) + "," + str(temp) + ",\n"

print csv

