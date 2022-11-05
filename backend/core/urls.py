from django.urls import path


from core import views

urlpatterns = [
    # path("login/", obtain_auth_token, name="login"),
    path("get_user/", views.get_user, name="get-user"),
    path("login/", views.ObtainUserAuthToken.as_view(), name="login"),
]
