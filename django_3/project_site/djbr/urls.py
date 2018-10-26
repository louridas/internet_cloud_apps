from django.urls import path

from . import views

app_name = 'djbr'

urlpatterns = [
    path('', views.index, name='index'),
    path('books/<int:book_id>/', views.book, name='book'),
    path('books/<int:book_id>/reviews/', views.reviews, name='reviews'),
    path('books/<int:book_id>/reviews/<int:review_id>',
        views.review, name='review'),
    path('authors/<int:author_id>/', views.author, name='author'),
]
