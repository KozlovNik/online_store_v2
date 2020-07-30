from rest_framework import serializers
from .serializers import ProductSerialzer, CategorySerializer
from rest_framework import generics
from rest_framework.response import Response
from .models import Category, Product


class ProductAPIView(generics.GenericAPIView):
    serializer_class = ProductSerialzer

    def get(self, request, *args, **kwargs):
        qs = Product.objects.all()
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)