from django.conf import settings
from django.db import models

from .utils import book_image_dir


class Book(models.Model):
    """ book model
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=250)
    desc = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to=book_image_dir, null=True, blank=True)

    categories = models.ManyToManyField('Category', blank=True)
    is_published = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    _default_title = "UNTITLED"

    def __str__(self):
        return "{}".format(self.title)

    def save(self, *args, **kwargs):
        if not self.id:
            self.title = self.title or self._default_title 

        return super(Book, self).save(*args, **kwargs)


class Category(models.Model):
    """ book category
    """
    name = models.CharField(max_length=150)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.name)