from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import AuthTokenSerializer, UserSerializer


class AuthToken(ObtainAuthToken):
    """ retrieve user token if user
        credentials are valid
    """
    serializer_class = AuthTokenSerializer

    def post(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data)
        
        if serializer.is_valid():
            token, created = Token.objects.get_or_create(
                user=serializer.user_cache)

            return Response({'token': token.key}, status=200)
        return Response(serializer.errors, status=400)


class AuthUser(ViewSet):
    """ authenticated user data
    """
    permission_classes = (IsAuthenticated,)

    def detail(self, *args, **kwargs):
        serializer = UserSerializer(self.request.user)
        return Response(serializer.data, status=200)