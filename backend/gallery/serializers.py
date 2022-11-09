from rest_framework import serializers
from gallery import models
from core.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ["id", "name"]


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    category = CategorySerializer(required=False)

    class Meta:
        model = models.Post
        fields = ["id", "user", "foto", "created_at", "category"]


class CategoryDetailSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)

    class Meta:
        model = models.Category
        fields = ["id", "name", "posts"]
