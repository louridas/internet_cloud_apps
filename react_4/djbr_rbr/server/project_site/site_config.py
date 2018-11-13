SECRET_KEY = '#8*xfqx#w(k@*fr9i=50i1k&wt2xr1b5k!f9%rq@^ewb2%l69*'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'djbr',
        'USER': 'djbr_user',
        'PASSWORD': 'g8nzmktk6y',
        'HOST': '127.0.0.1',
        'OPTIONS': {
            'isolation_level': 'read committed'
        }
    }
}
