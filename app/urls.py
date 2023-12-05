from django.urls import path, include

from . import views
from .views import LoginView, user_logout

from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path("test", views.index, name="index"),
    path("login/", LoginView.as_view(), name='login'),
    path('logout/', user_logout, name='logout'),
]