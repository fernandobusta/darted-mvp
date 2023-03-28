from .base import *


DEBUG = False

ALLOWED_HOSTS = []


# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
DATABASES = {
    # Configure DB settings on deployment server
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ["PGDATABASE"],
        'USER': os.environ["PGUSER"],
        'PASSWORD': os.environ["PGPASSWORD"],
        'HOST': os.environ["PGHOST"],
        'PORT': os.environ["PGPORT"],
    }
}