import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something
from service_rest.models import AutomobileVO

def poll():
    while True:
        print('Service poller polling for data')
        try:
            response = requests.get('http://inventory-api:8000/api/automobiles/')
            if response.status_code == 200:
                content =json.loads(response.content)
                for automobile_data in content['autos']:
                    AutomobileVO.objects.update_or_create(
                        vin=automobile_data['vin'],
                        defaults={'sold': automobile_data['sold']})
            else:
                print('error', file=sys.stderr)
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    poll()
