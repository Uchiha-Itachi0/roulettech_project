from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    """
    Custom manager for the CustomUser model.

    This manager handles the creation and management of user accounts,
    specifically focusing on creating users with email addresses as the
    unique identifier.

    Methods:
        create_user(email, password=None, **extra_fields): Creates and returns a new user with an email and password.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Create, save, and return a new user.

        This method handles the creation of a new user, ensuring that an email
        address is provided and properly normalized. The user's password is also
        securely hashed before being saved.

        Args:
            email (str): The email address of the user.
            password (str, optional): The password for the user account.
            **extra_fields: Additional fields to include when creating the user.

        Returns:
            CustomUser: The newly created user instance.

        Raises:
            ValueError: If no email is provided.
        """
        if not email:
            raise ValueError('User must have an email address.')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model for the application.

    This model represents a user in the system, using email as the unique
    identifier. It also includes a username field for additional identification
    and user management.

    Fields:
        email (str): The user's email address (unique).
        username (str): The user's username (not unique).
        USERNAME_FIELD (str): Specifies that email is the unique identifier for authentication.
        REQUIRED_FIELDS (list): A list of fields required to create a superuser.
    """
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        """
        String representation of the CustomUser.

        Returns:
            str: The user's email address.
        """
        return self.email
