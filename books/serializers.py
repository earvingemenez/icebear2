from rest_framework import serializers
from .models import Book, Chapter, Page


class BookSerializer(serializers.ModelSerializer):
    """ book serializer
    """
    class Meta:
        model = Book
        fields = (
            'id',
            'title',
            'desc',
            'image',
            'categories',
            'is_published',
            'date_created',
            'date_updated',
        )

    title = serializers.CharField(required=False)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        return super(BookSerializer, self).__init__(*args, **kwargs)

    def create(self, data):
        data['user'] = self.user
        return super(BookSerializer, self).create(data)


class ChapterSerializer(serializers.ModelSerializer):
    """ chapter serializer
    """
    class Meta:
        model = Chapter
        fields = (
            'id',
            'index',
            'date_created',
            'date_updated',
        )


class PageSerializer(serializers.ModelSerializer):
    """ page serializer
    """
    class Meta:
        model = Page
        fields = (
           'id',
           'chapter',
           'index',
           'data',
           'date_created',
           'date_updated', 
        )