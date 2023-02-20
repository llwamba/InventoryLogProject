from rest_framework import serializers
from InventoryApp.models import Vendors, Item, InventoryLog

class VendorsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vendors 
        fields=('VendorId','VendorName')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Item 
        fields=('ItemId','ItemName')

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model=InventoryLog 
        fields=('InventoryId','ItemId','VendorId','Quantity','DateLog', 'CostItem')

 