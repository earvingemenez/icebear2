from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
from .models import User


class AuthTokenSerializer(serializers.Serializer):
    """ auth token serializer
    """
    email = serializers.CharField()
    password = serializers.CharField()

    user_cache = None

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        self.user_cache = authenticate(email=email, password=password)

        if not self.user_cache:
            raise serializers.ValidationError(
                _('Unable to log in with provided credentials.'),
                code="authorization")

        return data


class UserSerializer(serializers.ModelSerializer):
    """ user serializer
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'image')