from .models import AutomobileVO, Salesperson, Customer, Sale
from django.http import JsonResponse
from django.db import transaction
from django.views.decorators.http import require_http_methods
import json
import requests
from .encoders import SalespersonEncoder, CustomerEncoder, SalesDetailEncoder


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_salesperson(request, pk):
    try:
        salesperson = Salesperson.objects.get(id=pk)
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"error": "Salesperson not found"},
            status=404
        )

    if request.method == "GET":
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        Salesperson.objects.filter(id=pk).update(**content)
        salesperson.refresh_from_db()
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )
    else:
        salesperson.delete()
        return JsonResponse(
            {"message": "Salesperson deleted"},
            status=204
        )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customer(request, pk):
    try:
        customer = Customer.objects.get(id=pk)
    except Customer.DoesNotExist:
        return JsonResponse(
            {"error": "Customer not found"},
            status=404
        )

    if request.method == "GET":
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        Customer.objects.filter(id=pk).update(**content)
        customer.refresh_from_db()
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )
    else:
        customer.delete()
        return JsonResponse(
            {"message": "Customer deleted"},
            status=204
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesDetailEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            with transaction.atomic():
                automobile_vo = AutomobileVO.objects.get(vin=content["automobile"])
                salesperson = Salesperson.objects.get(id=content["salesperson"])
                customer = Customer.objects.get(id=content["customer"])
                if automobile_vo.sold:
                    return JsonResponse(
                        {"error": f"{salesperson.first_name} {salesperson.last_name} already sold this car, bro!!"},
                        status=400
                    )
                sale = Sale.objects.create(
                    automobile=automobile_vo,
                    salesperson=salesperson,
                    customer=customer,
                    price=content["price"]
                )
                automobile_vo.sold = True
                automobile_vo.save()
                inventory_url = f"http://inventory-api:8000/api/automobiles/{automobile_vo.vin}/"
                requests.put(inventory_url, json={"sold": True})

            return JsonResponse(
                sale,
                encoder=SalesDetailEncoder,
                safe=False
            )

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid automobile VIN"},
                status=400
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid salesperson ID"},
                status=400
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid customer ID"},
                status=400
            )
        except KeyError as e:
            return JsonResponse(
                {"error": f"Missing required field: {str(e)}"},
                status=400
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, pk):
    try:
        sale = Sale.objects.get(id=pk)
    except Sale.DoesNotExist:
        return JsonResponse(
            {"error": "Sale not found"},
            status=404
        )

    if request.method == "GET":
        return JsonResponse(
            sale,
            encoder=SalesDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        try:
            with transaction.atomic():
                automobile_vo = sale.automobile
                automobile_vo.sold = False
                automobile_vo.save()
                inventory_url = f"http://inventory-api:8000/api/automobiles/{automobile_vo.vin}/"
                requests.put(inventory_url, json={"sold": False})

                sale.delete()

            return JsonResponse(
                {"message": "Sale deleted successfully"},
                status=200
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )
