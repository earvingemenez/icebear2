def book_image_dir(instance, filename):
    return "users/{}/books/{}".format(instance.user.id, filename)