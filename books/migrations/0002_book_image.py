# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-03 03:34
from __future__ import unicode_literals

import books.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=books.utils.book_image_dir),
        ),
    ]
