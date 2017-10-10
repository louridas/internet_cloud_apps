from django.conf.urls import url

from . import views

app_name = 'djbr'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^book/(?P<book_id>[0-9]+)/$', views.book, name='book'),
    url(r'^book/(?P<book_id>[0-9]+)/reviews/$', views.reviews, name='reviews'),
    url(r'^author/(?P<author_id>[0-9]+)/$', views.author, name='author'),    
]
