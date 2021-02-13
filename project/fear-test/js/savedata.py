import json
from browser.local_storage import storage

with open('data.txt', 'w') as outfile:
    json.dump(storage['mysetup'], outfile)
