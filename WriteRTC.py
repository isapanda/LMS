#!/usr/bin/python

import smbus
import time
import sys
import datetime

i2c = smbus.SMBus(1)
address = 0x51

#Read time frome Raspberry Pi
d = datetime.datetime.today()
dt = d.strftime("%Y%m%d")
tm = d.strftime("%H%M%S")

disp = str(dt) + "," + str(tm)

print ("Time of the Raspberry Pi : ") + str(disp)
print ("and")

#Set the date

year = int(d.strftime("%Y"),16)
month = int(d.strftime("%m"),16)
day = int(d.strftime("%d"),16)
hour = int(d.strftime("%H"),16)
min = int(d.strftime("%M"),16)
sec = int(d.strftime("%S"),16)

#Write date to RTC

i2c.write_byte_data(address,0x08,year)
i2c.write_byte_data(address,0x07,month)
i2c.write_byte_data(address,0x05,day)
i2c.write_byte_data(address,0x04,hour)
i2c.write_byte_data(address,0x03,min)
i2c.write_byte_data(address,0x02,sec)

#Read date from RTC

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

rtcdate = str(year) + str(month) + str(dey) + "," + str(hour) + str(min) + str(sec)

print ("SET RTC : ") + str(rtcdate)
