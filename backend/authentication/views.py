from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        request.data['username'] = request.data.get('email')
        response = super(LoginView, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({
            'token': token.key,
            'user_id': token.user_id,
            'email': token.user.email
        })


class UserView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
