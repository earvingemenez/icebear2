from django.conf.urls import url
from .views import Books, Book, Chapters, Chapter, Pages


urlpatterns = [
    url(r'^$', Books.as_view({
        'post': 'create',
    }), name="books"),
    url(r'^(?P<book_id>[0-9]+)/$', Book.as_view({
        'get': 'detail',
        'post': 'update'
    }), name="book"),

    url(r'^(?P<book_id>[0-9]+)/chapters/$', Chapters.as_view({
        'get': 'list',
    }), name="chapters"),

    url(r'^(?P<book_id>[0-9]+)/chapters/(?P<chapter_id>[0-9]+)/', Chapter.as_view({
        'get': 'detail'
    }), name="chapter"),

    url(r'^(?P<book_id>[0-9]+)/chapters/(?P<chapter_id>[0-9]+)/pages/$', Pages.as_view({
        'get': 'list',
    }), name="pages"),
]