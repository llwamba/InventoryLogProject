from django.urls import re_path
from InventoryApp import views


urlpatterns=[
    re_path(r'^vendors$', views.vendorsApi),
    re_path(r'^vendors/([0-9]+)$',views.vendorsApi),

    re_path(r'^item$', views.itemApi),
    re_path(r'^item/([0-9]+)$',views.itemApi),

    re_path(r'^inventorylog$', views.inventoryLogApi),
    re_path(r'^inventorylog/([0-9]+)$', views.inventoryLogApi),

    # re_path(r'^inventorylog/SaveFile', views.SaveFile)
]
# +static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)