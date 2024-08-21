"""
Serializers for user registration and authentication.

This module contains serializers used for user-related operations such as
registration and login. The serializers handle the validation and processing
of data for the `CustomUser` model, which uses email as the unique identifier.

Classes:
    RegisterSerializer: Handles user registration by validating and creating new users.
    LoginSerializer: Handles user login by validating email and password inputs.
"""

from rest_framework import serializers
from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.

    This serializer handles the creation of new users by accepting email,
    username, and password. It ensures that the password is write-only and
    securely stores it using Django's built-in password hashing.

    Fields:
        email (str): The email address of the user (required).
        username (str): The username of the user (required).
        password (str): The password for the user account (write-only).

    Methods:
        create(validated_data): Creates and returns a new `CustomUser` instance
        after hashing the provided password.
    """
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        """
        Creates a new `CustomUser` instance with the validated data.

        This method uses the `create_user` method from the `CustomUserManager`
        to handle the creation of a new user, ensuring that the password is
        hashed before saving.

        Args:
            validated_data (dict): The validated data containing email, username,
            and password.

        Returns:
            CustomUser: The newly created user instance.
        """
        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.

    This serializer handles the validation of user login data, specifically
    the email and password. It ensures that the email provided is in a valid
    format and that the password is not trimmed of whitespace.

    Fields:
        email (str): The email address of the user (required).
        password (str): The password for the user account (required).

    """
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )
