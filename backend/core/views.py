from rest_framework_simplejwt.views import TokenObtainPairView
from core import serializers


class TokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.TokenObtainPairSerializer
