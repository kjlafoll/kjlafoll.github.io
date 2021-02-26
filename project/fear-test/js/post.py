import json
import requests
from browser.local_storage import storage

data = {
	'token': 'CAADDCD6BAE5E84AAF0DEA1533E50FCA',
	'content': 'project',
	'format': 'json',
	'returnFormat': 'json'
}

if __name__ == '__main__':
	r= requests.post('https://redcap.case.edu/api/', data=data)
	storage['getRED'] = json.dumps(r)
	print(storage['getRED'])
