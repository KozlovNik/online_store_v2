from rest_framework import serializers

from .models import Category, Product, Cart, CartItem, RecentlyViewed, ViewedItem


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['name', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = '__all__'


class ViewedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewedItem
        depth = 1
        fields = ['id', 'product']


class RecentlyViewedSerializer(serializers.ModelSerializer):
    vieweditems = ViewedItemSerializer(many=True)
    class Meta:
        model = RecentlyViewed
        fields = ['id', 'vieweditems']


class ProductIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'item_total']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'items']

    def create(self, validated_data):
        instance, _ = Cart.objects.get_or_create(**validated_data)
        return instance

    # def get_queryset(self):
    #     """
    #     Optionally restricts the returned purchases to a given user,
    #     by filtering against a `username` query parameter in the URL.
    #     """
    #     queryset = Purchase.objects.all()
    #     cat = self.request.query_params.get('cat', None)
    #     if not cat:
    #         queryset = queryset.filter(purchaser__username=username)
    #     return queryset
