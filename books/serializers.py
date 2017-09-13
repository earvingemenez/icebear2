from rest_framework import serializers
from .models import Book


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