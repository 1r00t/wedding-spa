import uuid

from django.db import models
from django.contrib.auth.models import User

from django_resized import ResizedImageField


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

    def __str__(self):
        return self.user.username
