from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from service_rest.encoders import AppointmentEncoder, TechnicianEncoder
from .models import Technician, Appointment


@require_http_methods(['GET', 'POST'])
def api_list_technicians(request):
    if request.method == 'GET':
        technicians = Technician.objects.all()
        return JsonResponse(
            {'technicians': technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )


@require_http_methods(['DELETE'])
def api_delete_technician(request, id):
    if request.method == 'DELETE':
        try:
            count, _ = Technician.objects.filter(id=id).delete()
            return JsonResponse({'deleted': count > 0})
        except Technician.DoesNotExist:
            response = JsonResponse({'message': 'Error, Technician does not exist.'})
            response.status_code = 404
            return response


@require_http_methods(['GET', 'POST'])
def api_list_appointments(request):
    if request.method == 'GET':
        appointments = Appointment.objects.all()
        return JsonResponse(
            {'appointments': appointments},
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=content['technician'])
            content['technician'] = technician
            print("technician")
            content['status'] = 'created'
            print("status")
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            print("status 2")
            response = JsonResponse({'message': 'Error, unable to create appointment.'})
            response.status_code = 404
            return response


@require_http_methods(['DELETE'])
def api_delete_appointment(request, id):
    if request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=id).delete()
            return JsonResponse({'deleted': count > 0})
        except Appointment.DoesNotExist:
            response = JsonResponse({'message': 'Error, Appointment does not exist.'})
            response.status_code = 404
            return response


@require_http_methods(['PUT'])
def api_finish_appointment(request, id):
    if request.method == "PUT":
        try:
            content = {}
            content["status"] = "finished"
            Appointment.objects.filter(id=id).update(**content)
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({'message': 'Error, unable to update Appointment.'})
            response.status_code = 404
            return response


@require_http_methods(['PUT'])
def api_cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            content = {}
            content["status"] = "canceled"
            Appointment.objects.filter(id=id).update(**content)
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({'message': 'Error, unable to update Appointment.'})
            response.status_code = 404
            return response
