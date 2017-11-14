from django.conf.urls import url
from . import views

app_name = 'djbr'

urlpatterns = [
    url(r'^books/?$', views.BookList.as_view()),
    url(r'^books/(?P<pk>[0-9]+)/?$', views.BookDetail.as_view()),
]

