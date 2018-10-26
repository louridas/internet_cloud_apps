from django.urls import path

from . import views

app_name = 'djbr'

urlpatterns = [
    path('', views.index, name='index'),
    path('books/<int:book_id>/', views.book, name='book'),
    path('books/<int:book_id>/reviews/', views.reviews, name='reviews'),
    path('book/<int:book_id>/review/<int:review_id>',
        views.review, name='review'),
    path('book/<int:book_id>/review/', views.review, name='review'),
    path('authors/<int:author_id>/', views.author, name='author'),
]
