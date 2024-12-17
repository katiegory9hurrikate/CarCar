from django.db import models
from django.utils import timezone


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100, unique=True)
    sold = models.BooleanField(default=False)


class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    reason = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=150)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    @property
    def is_vip(self):
        try:
            automobile = AutomobileVO.objects.get(vin=self.vin)
            return automobile.sold
        except AutomobileVO.DoesNotExist:
            return False
