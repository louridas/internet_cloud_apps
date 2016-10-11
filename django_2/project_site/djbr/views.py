from django.shortcuts import render, get_object_or_404

from .models import Book, Author, Review

def index(request):
    latest_books_published = Book.objects.order_by('-pub_year', 'title')[:10]
    context = {'latest_books_published': latest_books_published}
    return render(request, 'djbr/index.html', context)
    
def book(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    return render(request, 'djbr/book.html', {'book': book})

def reviews(request, book_id):
    book_reviews = Review.objects.filter(book_id=book_id)
    return render(request, 'djbr/reviews.html',
                  {'book_reviews': book_reviews })

def author(request, author_id):
    author = get_object_or_404(Author, pk=author_id)
    return render(request, 'djbr/author.html', {'author': author})


