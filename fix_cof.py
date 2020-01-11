#!/usr/bin/env python3

import json

a = []
with open('WMM2020COF/WMM.COF','r') as ifh:
    l = ifh.readline().strip()
    while l:
        l = ifh.readline().strip().split()
        a.append(l)


with open('cofs.json','w') as ofh:
    ofh.write(json.dumps(a,indent=2))
    
