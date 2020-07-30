from django.urls import path

from django.conf import settings
from django.conf.urls.static import static
from .api import ProductAPIView


urlpatterns = [
    path('api/categories/', ProductAPIView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
