from django.contrib import admin
from .models import Salesperson, Customer, Sale, AutomobileVO


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'employee_id')


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', "address", 'phone_number')


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'automobile', 'salesperson', 'customer', 'price')


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = ('id', 'vin', 'sold')
