from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import serializers


class UserAuthTokenSerializer(AuthTokenSerializer):
    def __init__(self, instance=None, data=..., **kwargs):
        super().__init__(instance, data, **kwargs)

    username = serializers.CharField(max_length=200)
    password = None


class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=200)
