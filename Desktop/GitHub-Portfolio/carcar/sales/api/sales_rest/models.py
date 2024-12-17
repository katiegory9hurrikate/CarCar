from django.db import models
from django.urls import reverse


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=20, unique=True)

    def get_api_url(self):
        return reverse("api_show_salesperson", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.employee_id}"


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)

    def get_api_url(self):
        return reverse("api_show_customer", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class Sale(models.Model):
    automobile = models.ForeignKey(AutomobileVO, on_delete=models.CASCADE)
    salesperson = models.ForeignKey(Salesperson, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"pk": self.pk})

    def __str__(self):
        return f"Sale {self.id} of {self.automobile.vin} by {self.salesperson} to {self.customer} for {self.price}"
