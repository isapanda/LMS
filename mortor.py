#!/usr/bin/python
# -*- coding: utf-8 -*-

import smbus
import time
import sys
import datetime
import csv
import os

i2c = smbus.SMBus(1)
address = 0x48

#while True:

address = 0x50

f = open("/home/LMS/setting.csv","r")
reader = csv.reader(f)
rData = []
for row in reader:
	rData.append(row)
	i = row
f.close()

drive_time=int(i[2])

i2c.write_i2c_block_data(address,0x00,[0x01,0x01,drive_time])
#i2c.write_byte(address, 0x01)

print ("Mortor Dreive")
