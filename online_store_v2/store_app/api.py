from rest_framework import serializers, status
from .serializers import ProductSerializer, CategorySerializer, CartSerializer, CartItemSerializer, RecentlyViewedSerializer, ViewedItemSerializer
from rest_framework import generics
from rest_framework.response import Response
from .models import Category, Product
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from .models import Cart, CartItem, RecentlyViewed


DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 10


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 1000


class RecentlyViewedAPIView(APIView):
    def get(self, request, format=None):
        try:
            id = self.request.query_params.get('id', None)
            queryset = RecentlyViewed.objects.get(id=id)
        except:
            queryset = RecentlyViewed.objects.create()
        serializer = RecentlyViewedSerializer(
            queryset, context={'request': request})

        return Response(serializer.data)

    def post(self, request, format=None, **kwargs):

        id = self.request.query_params.get('id', None)
        viewedId = self.request.query_params.get('viewedId', None)
        q = RecentlyViewed.objects.get(id=id)
        # print(viewedId)
        item = q.add_to_recently_viewed(viewedId)
        serializer = ViewedItemSerializer(item, context={'request': request})
        return Response(serializer.data)


class CartAPIView(APIView):
    def get(self, request, format=None):
        try:
            cart_id = self.request.query_params.get('cartId', None)
            cart = Cart.objects.get(id=cart_id)
        except:
            cart = Cart.objects.create()
        serializer = CartSerializer(cart, context={'request': request})

        return Response(serializer.data)

    def post(self, request, format=None, **kwargs):
        cart_id = request.query_params.get('cartId', None)
        slug = request.query_params.get('slug', None)
        cart = Cart.objects.get(id=cart_id)
        item = cart.add_to_cart(slug)
        serializer = CartItemSerializer(item, context={'request': request})

        return Response(serializer.data)


class AddAPIView(APIView):

    def delete(self, request, id, format=None):
        cartItem = CartItem.objects.get(id=id)
        cartItem.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, id, format=None):
        cartItem = CartItem.objects.get(id=id)
        quantity = request.query_params.get('quantity', None)
        cartItem.quantity = quantity
        price = cartItem.product.price
        cartItem.item_total = price * int(quantity)
        cartItem.save()
        serializer = CartItemSerializer(cartItem, context={'request': request})
        return Response(serializer.data)


class ProductAPIView(generics.ListAPIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = ProductSerializer

    def get_queryset(self):

        queryset = Product.objects.all()
        try:
            cat_name = self.request.query_params.get('category', None)
            category = Category.objects.get(slug=cat_name)
            queryset = queryset.filter(category=category)
        except:
            pass
        return queryset


class ProductDetailAPIView(generics.RetrieveAPIView):
    # serializer_class = ProductSerializer
    def get(self, request, slug, format=None):
        try:
            product = Product.objects.get(slug=slug)
            serializer = ProductSerializer(
                product, context={'request': request})
        except:
            return Response(None)
        return Response(serializer.data)


# class AddRecentlyViewedAPIView(APIView):
#     def put(self, request, id, format=None):
#         cartItem = CartItem.objects.get(id=id)
#         quantity = request.query_params.get('quantity', None)
#         cartItem.quantity = quantity
#         price = cartItem.product.price
#         cartItem.item_total = price * int(quantity)
#         cartItem.save()
#         serializer = CartItemSerializer(cartItem,context={'request': request})
#         return Response(serializer.data)
