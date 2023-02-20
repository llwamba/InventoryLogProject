from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from InventoryApp.models import Vendors, Item, InventoryLog
from InventoryApp.serializers import VendorsSerializer, ItemSerializer, InventorySerializer

from django.core.files.storage import default_storage

# Create your views here.
@csrf_exempt
def vendorsApi(request,id=0):
    if request.method=='GET':
        vendors = Vendors.objects.all()
        vendors_serializer = VendorsSerializer(vendors, many=True)
        return JsonResponse(vendors_serializer.data, safe=False)
    elif request.method == 'POST':
        vendors_data = JSONParser().parse(request)
        vendors_serializer=VendorsSerializer(data=vendors_data)
        if vendors_serializer.is_valid():
            vendors_serializer.save()
            return JsonResponse('Added Successfully!',safe=False)
        return JsonResponse('Failed to Add!',safe=False)
    elif request.method =='PUT':
        vendors_data = JSONParser().parse(request)
        vendors=Vendors.objects.get(VendorId=vendors_data['VendorId'])
        vendors_serializer=VendorsSerializer(vendors,data=vendors_data)
        if vendors_serializer.is_valid():
            vendors_serializer.save()
            return JsonResponse('Updated Successfully!',safe=False)
        return JsonResponse('Failed to Update')
    elif request.method=='DELETE':
        vendors=Vendors.objects.get(VendorId=id)
        vendors.delete()
        return JsonResponse('Deleted Successfully!',safe=False)

@csrf_exempt
def itemApi(request,id=0):
    if request.method=='GET':
        item = Item.objects.all()
        item_serializer = ItemSerializer(item, many=True)
        return JsonResponse(item_serializer.data, safe=False)
    elif request.method == 'POST':
        item_data = JSONParser().parse(request)
        item_serializer=ItemSerializer(data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse('Added Successfully!',safe=False)
        return JsonResponse('Failed to Add!',safe=False)
    elif request.method =='PUT':
        item_data = JSONParser().parse(request)
        item=Item.objects.get(ItemId=item_data['ItemId'])
        item_serializer=ItemSerializer(item, data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse('Updated Successfully!',safe=False)
        return JsonResponse('Failed to Update')
    elif request.method=='DELETE':
        item=Item.objects.get(ItemId=id)
        item.delete()
        return JsonResponse('Deleted Successfully!',safe=False)

@csrf_exempt
def inventoryLogApi(request,id=0):
    if request.method=='GET':
        inventorylog = InventoryLog.objects.all()
        inventorylog_serializer = InventorySerializer(inventorylog, many=True)
        return JsonResponse(inventorylog_serializer.data, safe=False)
    elif request.method == 'POST':
        inventorylog_data = JSONParser().parse(request)
        inventorylog_serializer=InventorySerializer(data=inventorylog_data)
        if inventorylog_serializer.is_valid():
            inventorylog_serializer.save()
            return JsonResponse('Added Successfully!',safe=False)
        return JsonResponse('Failed to Add!',safe=False)
    elif request.method =='PUT':
        inventorylog_data = JSONParser().parse(request)
        inventorylog=InventoryLog.objects.get(InventoryId=inventorylog_data['InventoryId'])
        inventorylog_serializer=InventorySerializer(inventorylog, data=inventorylog_data)
        if inventorylog_serializer.is_valid():
            inventorylog_serializer.save()
            return JsonResponse('Updated Successfully!',safe=False)
        return JsonResponse('Failed to Update')
    elif request.method=='DELETE':
        inventorylog=InventoryLog.objects.get(InventoryId=id)
        inventorylog.delete()
        return JsonResponse('Deleted Successfully!',safe=False)

# @csrf_exempt
# def SaveFile(request):
#     file=request.FILES['file']
#     file_name=default_storage.save(file.name,file)
#     return JsonResponse(file_name,safe=False)