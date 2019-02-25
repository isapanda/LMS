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
i2c.write_byte(address, 0x01)

print ("Mortor Dreive")
