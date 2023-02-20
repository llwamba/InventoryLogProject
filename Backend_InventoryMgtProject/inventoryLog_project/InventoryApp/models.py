from django.db import models

# We Need 3 Models

# The vendors model has two fields: Vendor ID, and the Vendor Name


class Vendors(models.Model):
    VendorId = models.AutoField(primary_key=True)
    VendorName = models.CharField(max_length=500)

# The Item model has two field: The Item ID, and the Item Name


class Item(models.Model):
    ItemId = models.AutoField(primary_key=True)
    ItemName = models.CharField(max_length=500)

# The Inventory Log has four fields: Inventory ID, Item, DateTime, and Amount


class InventoryLog(models.Model):
    InventoryId = models.AutoField(primary_key=True)
    ItemId = models.ForeignKey(Item, on_delete=models.CASCADE)
    VendorId = models.ForeignKey(Vendors, on_delete=models.CASCADE)
    Quantity = models.IntegerField()
    DateLog = models.DateTimeField()
    CostItem = models.DecimalField(max_digits=7 ,decimal_places=2, default=0.0)
   
