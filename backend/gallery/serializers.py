from rest_framework import serializers
from gallery import models
from core.serializers import UserSerializer


from pictures.contrib.rest_framework import PictureField as RestPictureField
from pictures.models import PictureField


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ["id", "name"]


class PostListSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    category = CategorySerializer(required=False)
    picture = RestPictureField()

    class Meta:
        model = models.Post
        fields = ["id", "user", "picture", "created_at", "category"]


class PostCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    category = CategorySerializer(required=False)
    picture = PictureField()

    class Meta:
        model = models.Post
        fields = ["id", "user", "picture", "created_at", "category"]


class CategoryDetailSerializer(serializers.ModelSerializer):
    posts = PostListSerializer(many=True)

    class Meta:
        model = models.Category
        fields = ["id", "name", "posts"]
