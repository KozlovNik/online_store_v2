from .models import User
from store_app.models import Product
from store_app.serializers import ProductIdSerializer
from rest_framework import serializers
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from knox.models import AuthToken

class LikesAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        id = self.request.query_params.get('id', None)
        product = Product.objects.get(id=id)
        product.users.add(self.request.user)
        product.save()
        serializer = ProductIdSerializer(product)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        id = self.request.query_params.get('id', None)
        product = Product.objects.get(id=id)
        product.users.remove(self.request.user)
        product.save()
        return Response({})


class UserAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user).data,
            "token": AuthToken.objects.create(user)[1]
        })

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user).data,
            "token": AuthToken.objects.create(user)[1]
        })