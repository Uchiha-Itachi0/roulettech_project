"""
Views for user registration and authentication.

This module contains views that handle user registration and login functionalities.
It uses Django's built-in authentication system and Django REST Framework (DRF)
to create API endpoints for user management. The views are designed to work
with a custom user model, `CustomUser`, where email is the unique identifier
for users.

Classes:
    RegisterView: Handles the registration of new users.
    LoginView: Handles user login and authentication.

"""

from django.contrib.auth import authenticate
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(generics.CreateAPIView):
    """
    API view to handle the registration of new users.

    This view allows any user to register by providing an email and password.
    It ensures that the email provided is unique. If the email already exists
    in the system, a 400 Bad Request response is returned with an appropriate
    error message.

    Methods:
        create(request, *args, **kwargs): Creates a new user after validating
        that the email does not already exist.
    """
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            return Response({
                'message': 'A user with this email already exists'
            }, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)


class LoginView(ObtainAuthToken):
    """
    API view to handle user login and authentication.

    This view allows users to log in by providing their email and password.
    It uses Django's `authenticate` method to verify the credentials. If the
    credentials are valid, a success message is returned. If the email or
    password is incorrect, an appropriate error message is returned.

    Methods:
        post(request, *args, **kwargs): Authenticates the user and returns a
        response based on the validity of the credentials.
    """
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():

            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(request, email=email, password=password)

            if user is not None:
                return Response({"message": "Successfully logged in"}, status=status.HTTP_200_OK)

            else:
                try:
                    CustomUser.objects.get(email=email)
                    return Response({'message': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

                except CustomUser.DoesNotExist:
                    return Response({'message': 'User with this email does not exist'},
                                    status=status.HTTP_401_UNAUTHORIZED)

        errors = [value[0] for key, value in serializer.errors.items()]
        return Response({'message': errors[0]},
                        status=status.HTTP_400_BAD_REQUEST)
