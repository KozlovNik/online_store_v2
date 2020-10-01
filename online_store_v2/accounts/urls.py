from django.urls import path
from .api import LoginView, RegisterView, UserAPIView, LikesAPIView
from knox.views import LogoutView

urlpatterns = [
    path('api/accounts/login/', LoginView.as_view()),
    path('api/accounts/register/', RegisterView.as_view()),
    path('api/accounts/user/', UserAPIView.as_view()),
    path('api/accounts/logout/', LogoutView.as_view()),
    path('api/likes/', LikesAPIView.as_view()),
]
