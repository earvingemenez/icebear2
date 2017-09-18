from django.shortcuts import get_object_or_404

from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .mixins import EndpointMixin
from .serializers import BookSerializer, ChapterSerializer, PageSerializer


class Books(ViewSet):
    """ books related endpoints
    """
    permission_classes = (IsAuthenticated,)

    def create(self, *args, **kwargs):
        """ create an untitled book
        """
        serializer = BookSerializer(
            data=self.request.data, user=self.request.user)
        
        if serializer.is_valid():
            instance = serializer.save()

            return Response({'id': instance.id}, status=201)
        return Response(serializer.errors, status=400)


class Book(EndpointMixin, ViewSet):
    """ book detail related endpoints
    """
    permission_class = (IsAuthenticated,)
    serializer_class = BookSerializer

    def detail(self, *args, **kwargs):
        """ book detail
        """
        serializer = self.serializer_class(self._get(
            id=kwargs.get('book_id')
        ))

        return Response(serializer.data, status=200)

    def update(self, *args, **kwargs):
        """ update book
        """
        serializer = self.serializer_class(
            instance=self._get(id=kwargs.get('book_id')),
            data=self.request.data
        )
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=204)
        return Response(serializer.errors, status=400)


class Chapters(EndpointMixin, ViewSet):
    """ book chapter related endpoints
    """
    permission_class = (IsAuthenticated,)
    serializer_class = ChapterSerializer

    def list(self, *args, **kwargs):
        serializer = self.serializer_class(
            self._filter(book__id=kwargs.get('book_id')),
            many=True
        )

        return Response(serializer.data, status=200)


class Pages(EndpointMixin, ViewSet):
    """ chapter page related endpoints
    """
    permission_class = (IsAuthenticated,)
    serializer_class = PageSerializer

    def list(self, *args, **kwargs):
        serializer = self.serializer_class(
            self._filter(chapter__id=kwargs.get('chapter_id')),
            many=True
        )

        return Response(serializer.data, status=200)