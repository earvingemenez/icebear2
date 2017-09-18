from django.apps import apps
from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models

from .utils import book_image_dir


class Book(models.Model):
    """ book model
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=250, unique=True)
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
        if self.id:
            return super(Book, self).save(*args, **kwargs)

        # create new book
        self.title = self.title or self._default_title
        instance = super(Book, self).save(*args, **kwargs)

        # create default chapter
        self._new_chapter()
        return instance
            
    def _new_chapter(self):
        """ create a new chapter of this book
        """
        return apps.get_model(
            self._meta.app_label,
            'Chapter'
        ).objects.create(book=self)


class Category(models.Model):
    """ book category
    """
    name = models.CharField(max_length=150)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.name)


class Chapter(models.Model):
    """ chapter model
    """
    book = models.ForeignKey(Book)
    index = models.PositiveIntegerField(default=1)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self, *args, **kwargs):
        return "{}".format(self.book.title)

    def save(self, *args, **kwargs):
        if self.id:
            return super(Chapter, self).save(*args, **kwargs)

        # create new chapter
        instance = super(Chapter, self).save(*args, **kwargs)
        # create default page
        self._new_page()
        return instance

    def _new_page(self, index=1):
        """ create a new page to this chapter
        """
        return apps.get_model(
            self._meta.app_label,
            'Page'
        ).objects.create(chapter=self, index=index)


class Page(models.Model):
    """ page model
    """
    chapter = models.ForeignKey(Chapter)
    index = models.PositiveIntegerField(default=0)
    data = JSONField(default=[])

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} p.{}".format(self.chapter, self.index)