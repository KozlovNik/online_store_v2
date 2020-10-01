from accounts.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'likes']


class RegisterSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField()

    class Meta:
        model = User
        fields = ['email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        return User.objects.create_user(email=email, password=password)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Несовпадение пароля")
        return data

# class ProductIdSerialiser(serializers.Serializer):
#     class Meta:
#         model = Product
#         fields = 


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Некорректные данные")
