def user_image_dir(instance, filename):
    return "users/{}/profile/{}".format(instance.id, filename)