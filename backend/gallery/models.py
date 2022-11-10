import uuid

from django.db import models
from django.contrib.auth.models import User

from pictures.models import PictureField


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.id} - {self.name}"


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")

    height_field = models.PositiveIntegerField(blank=True, null=True)
    width_field = models.PositiveIntegerField(blank=True, null=True)

    picture = PictureField(
        upload_to="pictures",
        aspect_ratios=[None, "1/1"],
        width_field="width_field",
        height_field="height_field",
    )

    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="category", default=1
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.user.username
