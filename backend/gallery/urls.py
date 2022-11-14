from django.urls import path
from gallery import views

urlpatterns = [
    path("", views.PostList.as_view(), name="post-list"),
    path("create/", views.PostCreate.as_view(), name="post-create"),
    path("categories/", views.CategoryList.as_view(), name="category-list"),
    path(
        "categories/<int:pk>/", views.CategoryDetail.as_view(), name="category-detail"
    ),
    path("<str:pk>/", views.PostDetail.as_view(), name="post-detail"),
    path("<str:pk>/delete/", views.PostDelete.as_view(), name="post-delete"),
]
