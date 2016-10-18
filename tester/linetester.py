# coding: UTF-8


import urllib
import urllib2

import json

#url = "http://fiap-sandbox.gutp.ic.i.u-tokyo.ac.jp/axis2/services/FIAPStorage"

#url = "http://localhost:8080/push"
#url = "http://localhost:3000/linebot"
url = "http://homeict.net/linebot"
#url ="http://ieee1888.herokuapp.com/gateway"

#params = urllib.urlencode(params)
headers ={
  "Content-Type":"text/json;charset=UTF-8",
  #"SOAPAction":'"http://soap.fiap.org/data"',
  #"Content-Type":"text/xml;charset=UTF-8",
}

body3='''{"events":[{"type":"message","replyToken":"aaaaa","source":{"userId":"yyyyyy","type":"user"},"timestamp":1476775063995,"message":{"type":"text","id":"xxxxxx","text":"い"}}]}'''

req = urllib2.Request(url,body3,headers)
res = urllib2.urlopen(req)
r = res.read()
print r
