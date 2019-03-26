#!/usr/bin/python
# -*- coding: utf-8 -*-

import smbus
import time
from time import sleep
import sys
import datetime
import csv
import os

i2c = smbus.SMBus(1)
address = 0x48

#while True:

block = i2c.read_i2c_block_data(address, 0x00, 2)
temp = (block[0] << 8 | block[1]) >> 3

if(temp >= 4096):
 temp -= 819
temp = temp * 0.0625
temp = round(temp,1)

address = 0x50
i2c.write_i2c_block_data(address,0x00,[0x00,0x02,0x00])
#i2c.write_byte(address, 0x02)
sleep(1)
block = i2c.read_byte(address)
adc = block * 100 / 255

address = 0x51
block = i2c.read_i2c_block_data(address, 0x02, 7)
sec = (((block[0] >>4) *10 + (block[0] & 0x0f) )& 127)
sec = '%02d' % sec
min = (((block[1] >>4) *10 + (block[1] & 0x0f) )& 127)
min = '%02d' % min
hour = block[2] & 0x3f
hour = (((hour >>4) *10 + (hour & 0x0f))& 0x3f)
hour = '%02d' % hour
dey = block[3] & 0x3f
dey = (((dey >>4) *10 + (dey & 0x0f))& 0x3f)
dey = '%02d' % dey
weekdey = (block[4] & 7)
month = (block[5] & 0x1f)
month = (((month >>4) *10 + (month & 0x0f))& 0x1f)
month = '%02d' % month
year = (((block[6] >>4) *10 + (block[6] & 0x0f))& 0xff) + 2000

#print("PSoC_DATA:%6.2f" % (temp / 16.0))

if __name__ == '__main__':

	try:
		d = datetime.datetime.today()
		dt = d.strftime("%Y%m%d")
		tm = d.strftime("%H%M%S")
		rtcdey = str(year) + str(month) + dey
		rtctime = str(hour) + str(min) + str(sec)

		disp = str(rtcdey) + "," + str(hour) + str(min) + str(sec) + "," + str(temp) + "," + str (adc) + ",\n"

		fname = rtcdey + '_lmsdata.csv'	

		f = open("/home/LMS/log.csv","r")
		reader = csv.reader(f)
		rData = []
		for row in reader:
			rData.append(row)
			i = row
		f.close()
		i = map(str,row)
		i= ",".join(i)
		path = "/home/LMS/"
		pname = path + fname
		if i != pname:
			f = open("/home/LMS/log.csv","a")
			csvWriter = csv.writer(f)
			dayData = []
			dayData.append(pname)
			csvWriter.writerow(dayData)
			f.close()

		f = open(pname,'a')
		csvWriter = csv.writer(f)

		listData = []
		listData.append(rtcdey)
		listData.append(rtctime)
		listData.append(temp)
		listData.append(adc)

		csvWriter.writerow(listData)
		f.close()

		print disp

	except KeyboardInterrupt:
		pass
