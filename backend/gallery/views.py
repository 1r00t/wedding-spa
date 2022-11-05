from gallery import serializers
from gallery import models
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class PostList(generics.ListCreateAPIView):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [IsAuthenticated]
