from enum import unique
from unicodedata import name
import uuid

from django.db import models
from django.contrib.auth.models import User

from django_resized import ResizedImageField


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.id} - {self.name}"


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    foto = ResizedImageField(
        size=[1920, None],
        upload_to="user_uploads",
        quality=80,
        force_format="jpeg",
        blank=True,
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="category", default=1
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.user.username
