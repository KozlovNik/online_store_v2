from django.urls import path

from django.conf import settings
from django.conf.urls.static import static
from .api import ProductAPIView, CartAPIView,AddAPIView


urlpatterns = [
    path('api/products/', ProductAPIView.as_view()),
    path('api/cart-items/', CartAPIView.as_view()),
    path('api/cart-items/<id>', AddAPIView.as_view())
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
