from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from app import serializers
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


# @login_required
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
def user_logout(request):
    logout(request)
    # Redirect to the homepage or any other desired page after logout
    return redirect('/')


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        # Get username and password from the request data
        email = request.data.get('email')
        password = request.data.get('password')

        # Attempt to authenticate a user with the provided username and password
        user = authenticate(username=email, password=password)

        # Check if authentication was successful
        if user is not None:
            # A backend authenticated the credentials
            # Perform actions for authenticated user, e.g., log them in
            response_data = {
                'message': 'Authentication successful',
                'username': user.username,
                # Additional data you may want to include in the response
            }
            return Response(response_data, status=status.HTTP_200_OK)

        else:
            # No backend authenticated the credentials
            # Handle the case where authentication failed
            response_data = {'message': 'Authentication failed'}
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)