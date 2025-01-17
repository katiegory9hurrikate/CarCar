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
        "model",
        "sold",
    ]
    encoders = {
        "model": VehicleModelEncoder(),
    }
