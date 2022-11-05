from django.urls import path
from gallery import views

urlpatterns = [
    path("", views.PostList.as_view(), name="post-list"),
]
