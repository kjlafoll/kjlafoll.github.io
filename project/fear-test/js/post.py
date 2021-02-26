import json
import requests
from browser.local_storage import storage

data = {
	'token': 'CAADDCD6BAE5E84AAF0DEA1533E50FCA',
	'content': 'project',
	'format': 'json',
	'returnFormat': 'json'
}
r= requests.post('https://redcap.case.edu/api/', data=data)
print('HTTP Status: ' + str(r.status_code))
print(r.json())
