from django.contrib import admin
from .models import Book, Category, Chapter, Page


class BookAdmin(admin.ModelAdmin):
    model = Book
    list_display = ('title', 'user', 'image', 'date_updated', 'date_created')
    filter_horizontal = ('categories',)

class ChapterAdmin(admin.ModelAdmin):
    model = Chapter

class PageAdmin(admin.ModelAdmin):
    model = Page


admin.site.register(Book, BookAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Page, PageAdmin)
admin.site.register(Category)