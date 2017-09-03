from django.conf.urls import url
from .views import AuthToken, AuthUser


urlpatterns = [
    url(r'^auth/token/$', AuthToken.as_view(), name="auth_token"),
    url(r'^auth/user/$', AuthUser.as_view({
        'get': 'detail',
    }), name="auth_user"),
]