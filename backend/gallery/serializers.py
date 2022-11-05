from rest_framework import serializers
from gallery import models
from core.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = models.Post
        fields = ["id", "user", "foto"]
