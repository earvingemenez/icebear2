from django.conf.urls import url
from .views import Books


urlpatterns = [
    url(r'^$', Books.as_view({
        'post': 'create',
    }), name="books"),
]