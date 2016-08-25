var xml2js  = require('xml2js');

var xmlmake = {



	makeOk:function(){
		
		var builder = new xml2js.Builder({ rootName : 'soapenv:Envelope'});
		var header={"OK":""};
		var transport={"header":header,$:{'xmlns':"http://gutp.jp/fiap/2009/11/"}};
		var dataRS={"transport":transport,$:{'xmlns:ns2':"http://soap.fiap.org/"}};

		var body={"ns2:dataRS":dataRS};
		var root = {"soapenv:Body":body,$:{"xmlns:soapenv":"http://schemas.xmlsoap.org/soap/envelope/"}};
		var xml = builder.buildObject(root);
		return xml.toString();
	}


}

module.exports = xmlmake;
