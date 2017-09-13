from django.contrib import admin
from .models import Book, Category


class BookAdmin(admin.ModelAdmin):
    model = Book
    list_display = ('title', 'user', 'image', 'date_updated', 'date_created')
    filter_horizontal = ('categories',)

admin.site.register(Book, BookAdmin)
admin.site.register(Category)