#!/usr/local/bin/python3

import subprocess
import time
import datetime
import json

def getNow():
    now = datetime.datetime.now()
    return int(time.mktime(now.timetuple())*1e3 + now.microsecond/1e3)

def getSome(t_from):
    check_time = getNow()
    args = [
        'aws',
        'logs',
        'filter-log-events',
        '--log-group-name',
        '/aws/lambda/METARreader',
        '--interleaved',
        '--start-time',
        str(t_from),
        '--end-time',
        str(check_time) 
    ]
    p = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, err = p.communicate()
    data = json.loads(out.decode('utf-8'))
    print(data)
    return check_time



if __name__ == '__main__':
    last = getNow()
    while True:
        last = getSome(last)
        time.sleep(20)

