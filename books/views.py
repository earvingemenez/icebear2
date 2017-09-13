from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import BookSerializer


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
