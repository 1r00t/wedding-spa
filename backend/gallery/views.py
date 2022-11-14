from gallery import serializers
from gallery import models
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response


class OwnPostPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class PostDelete(generics.DestroyAPIView):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostListSerializer
    permission_classes = [OwnPostPermission]


class PostList(generics.ListAPIView):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostListSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostCreate(generics.CreateAPIView):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostDetail(generics.RetrieveAPIView):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostListSerializer
    permission_classes = [IsAuthenticated]


class CategoryList(generics.ListAPIView):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None


class CategoryDetail(generics.ListAPIView):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostListSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        category = get_object_or_404(models.Category, pk=kwargs["pk"])
        posts = self.get_queryset().filter(category=category)

        page = self.paginate_queryset(posts)
        if page is not None:
            posts = self.get_serializer(page, many=True)
            return self.get_paginated_response(posts.data)

        return Response(posts.data)
