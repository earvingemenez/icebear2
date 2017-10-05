from rest_framework import serializers
from .models import Book, Chapter, Page


class ChapterSerializer(serializers.ModelSerializer):
    """ chapter serializer
    """
    pages = serializers.SerializerMethodField()

    def get_pages(self, instance):
        return PageSerializer(
            Page.objects.filter(chapter=instance), many=True).data

    class Meta:
        model = Chapter
        fields = [
            'id',
            'index',
            'title',
            'date_created',
            'date_updated',
            'pages',
        ]

    def __init__(self, *args, **kwargs):
        self.full_details = kwargs.pop('full', None)
        return super(ChapterSerializer, self).__init__(*args, **kwargs)

    def to_representation(self, obj):
        # get the original representation
        ret = super(ChapterSerializer, self).to_representation(obj)

        # remove pages if not full_details is enabled.
        if not self.full_details:
            ret.pop('pages')

        return ret


class BookSerializer(serializers.ModelSerializer):
    """ book serializer
    """
    chapters = serializers.SerializerMethodField()

    def get_chapters(self, instance):
        chapters = Chapter.objects.filter(book=instance).order_by('index')
        return ChapterSerializer(chapters, many=True).data

    class Meta:
        model = Book
        fields = (
            'id',
            'title',
            'desc',
            'image',
            'categories',
            'chapters',
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