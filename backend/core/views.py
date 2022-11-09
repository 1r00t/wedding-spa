from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from core import serializers


class ObtainUserAuthToken(ObtainAuthToken):
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)

    serializer_class = serializers.UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data["username"]
        user, created = User.objects.get_or_create(username=username)
        if created:
            user.set_password(username)
            user.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.username})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = serializers.UserSerializer(request.user)
    return Response(user.data)
