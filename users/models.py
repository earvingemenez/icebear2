from django.conf import settings

from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _

from rest_framework.authtoken.models import Token
from .utils import user_image_dir



class UserManager(BaseUserManager):
    """ custom manager
    """
    def create_user(self, email, password=None, **kwargs):
        """ create a new user
        """
        if not email:
            raise ValueError(_("Email is required"))

        instance = self.model(email=email)
        instance.set_password(password)
        instance.save()

        return instance

    def create_superuser(self, email, password, **kwargs):
        instance = self.create_user(email, password, **kwargs)
        instance.is_staff = True
        instance.is_superuser = True
        instance.save()

        return instance


class User(AbstractBaseUser, PermissionsMixin):
    """ user model
    """
    email = models.EmailField(max_length=150, unique=True)
    first_name = models.CharField(max_length=40, null=True, blank=True)
    last_name = models.CharField(max_length=40, null=True, blank=True)
    image = models.ImageField(upload_to=user_image_dir, null=True, blank=True)

    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return "{email}".format(email=self.email)

    def get_full_name(self):
        """ user's full name
        """
        return "{} {}".format(self.first_name, self.last_name)

    def get_short_name(self):
        """ user's first name
        """
        return "{}".format(self.first_name)



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """ create a token when user is created
    """
    if created:
        Token.objects.create(user=instance)