#!/usr/bin/python
# -*- coding: utf-8 -*-

import smbus
import time
import sys
import datetime
import csv
import os

i2c = smbus.SMBus(1)

address = 0x50

i2c.write_i2c_block_data(address,0x00,[0x00,0x02,0x00])
#i2c.write_byte(address,0x02)

block = i2c.read_byte(address)
adc = block * 100 / 255

print adc
