from django.urls import re_path

from . import views

app_name = 'djbr'

urlpatterns = [
    re_path('^books/?$', views.BookList.as_view()),    
    re_path(r'^books/(?P<pk>\d+)/?$', views.BookDetail.as_view()),
    re_path(r'^books/(?P<book_id>\d+)/reviews/?$',
            views.ReviewList.as_view()),
]
