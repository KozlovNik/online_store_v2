from rest_framework.serializers import ModelSerializer

from .models import Category, Product


class ProductSerialzer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CategorySerializer(ModelSerializer):
    products = ProductSerialzer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['name', 'slug', 'products']
