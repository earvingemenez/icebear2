from django.shortcuts import get_object_or_404


class EndpointMixin(object):
    """ model manager for viewsets
    """
    def __init__(self, *args, **kwargs):
        return super(ModelMixin, self).__init__(*args, **kwargs)

    def get_model(self):
        """ get model class based on the
            `serializer_class` attribute.
        """
        return self.serializer_class.Meta.model

    def _get(self, **params):
        """ get model object
        """
        return get_object_or_404(self.get_model(), **params)

    def _filter(self, **params):
        return self.get_model().objects.filter(**params)