from django.urls import re_path

from . import views

app_name = 'djbr'

urlpatterns = [
    re_path(r'^books/?$', views.BookList.as_view()),
    re_path(r'^books/(?P<pk>\d+)/?$', views.BookDetail.as_view()),
]
