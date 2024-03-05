import os


def validate_file_extension(name):
    """ Validate file extension """
    is_valid = True
    ext = os.path.splitext(name)[1]
    validate_extensions = ['.pdf']

    if not ext.lower() in validate_extensions:
        is_valid = False

    return is_valid
