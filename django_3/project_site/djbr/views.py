from django.shortcuts import render, get_object_or_404

from django.urls import reverse
from django.utils import timezone
from django.http.response import HttpResponseRedirect

from .models import Book, Author, Review

def index(request):
    latest_books_published = Book.objects.order_by('-pub_year', 'title')[:10]
    context = {'latest_books_published': latest_books_published}
    return render(request, 'djbr/index.html', context)

def book(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    return render(request, 'djbr/book.html', {'book': book})

def author(request, author_id):
    author = get_object_or_404(Author, pk=author_id)
    return render(request, 'djbr/author.html', {'author': author})

def reviews(request, book_id):
    book_reviews = Review.objects.filter(book_id=book_id)
    return render(request, 'djbr/reviews.html',
                  {'book_reviews': book_reviews })

def review(request, book_id, review_id=None):
    if review_id is not None:
        review = get_object_or_404(Review, pk=review_id)
    else:
        review = Review()
        review.book_id = book_id
    if request.method == 'POST':
        review.title = request.POST['title']
        review.text = request.POST['text']
        review.review_date = timezone.now()
        review.save()
        return HttpResponseRedirect(reverse('djbr:reviews', args=(book_id,)))
    else:
        context = {
        'book_id': book_id,
        'review_id': review_id,
        'title': review.title,
        'text': review.text
    }
    return render(request, 'djbr/review.html', context)
