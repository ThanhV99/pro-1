from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter

from . import views
from .views import RegisterUserAPIView, SendEmailViewSet, activate

from rest_framework import routers


# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)
router = DefaultRouter()
# router.register(r'send-email', SendEmailViewSet, basename='send-email')

urlpatterns = [
    path('', include(router.urls)),
    path("test", views.index, name="index"),
    path('register/', RegisterUserAPIView.as_view()),
    # re_path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', activate, name='activate'),
]