from common.json import ModelEncoder
from .models import Automobile, Manufacturer, VehicleModel


class ManufacturerEncoder(ModelEncoder):
    model = Manufacturer
    properties = [
        "id",
        "name",
    ]


class VehicleModelEncoder(ModelEncoder):
    model = VehicleModel
    properties = [
        "id",
        "name",
        "manufacturer",
    ]
    encoders = {
        "manufacturer": ManufacturerEncoder(),
    }


class AutomobileEncoder(ModelEncoder):
    model = Automobile
    properties = [
        "id",
        "picture_url",
        "color",
        "year",
        "vin",
        "price",
        "model",
        "sold",
    ]
    encoders = {
        "model": VehicleModelEncoder(),
    }

    def default(self, obj):
        if isinstance(obj, int):
            return obj
        elif obj is None:
            return None
        return super().default(obj)
