/*
*需要带参数才能正常展示
*/
// var url = 'http://ws.didadiandan.com:80';
// var host = 'ws.didadiandan.com:80';
// var url = 'http://ws.didadiandan.com:8204';
// var host = 'ws.didadiandan.com:8204';

//192.168.0.108:8888     192.168.0.129:8090
//var url = 'http://192.168.0.108:8888';
//var host = '192.168.0.108:8888 ';
// var url = 'http://ycsport.didadiandan.com';
// var host = 'ycsport.didadiandan.com';
//var url = 'http://192.168.0.120:10992';
//var host = '192.168.0.120:10992';
var url = 'http://192.168.0.108:8888';
var host = '192.168.0.108:8888';

module.exports = {
	'/admin/menu/data': {target: url,host: host,changeOrigin: true,secure: false},
	'/common/admin/login/*': {target: url,host: host,changeOrigin: true,secure: false},
	'/common/admin/logout': {target: url,host: host,changeOrigin: true,secure: false},
	'/admin/home/userInfo': {target: url,host: host,changeOrigin: true,secure: false},
	'/admin/pptTemps/': {target: url,host: host,changeOrigin: true,secure: false},
	'/admin/pptTemps/save/': {target: url,host: host,changeOrigin: true,secure: false},
	'/admin/pptTags/': {target: url,host: host,changeOrigin: true,secure: false},
	'/admin/users/': {target: url,host: host,changeOrigin: true,secure: false},
	'/cccddd/**': {target: url,host: host,changeOrigin: true,secure: false},
};
