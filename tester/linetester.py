# coding: UTF-8


import urllib
import urllib2

#url = "http://fiap-sandbox.gutp.ic.i.u-tokyo.ac.jp/axis2/services/FIAPStorage"

#url = "http://localhost:8080/push"
url = "http://localhost:3000/linebot"
#url ="http://ieee1888.herokuapp.com/gateway"

#params = urllib.urlencode(params)
headers ={
  "Content-Type":"text/json;charset=UTF-8",
}

body3=xx

req = urllib2.Request(url,body17,headers2)

#req = urllib2.Request(url,body3,headers)
#req = urllib2.Request(url,body10,headers)

# ヘッダ設定
#req.add_header('test', 'application/x-www-form-urlencoded')
#req.add_header('SOAPAction', '"http://soap.fiap.org/data"')
# パラメータ設定
#req.add_data(params)
res = urllib2.urlopen(req)
r = res.read()
print r
