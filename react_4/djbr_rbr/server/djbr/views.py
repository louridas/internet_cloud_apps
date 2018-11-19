from .models import Book
from .serializers import BookSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from rest_framework import status
from rest_framework.views import exception_handler

from django.contrib.staticfiles import views

def index(request):
    return views.serve(request, 'index.html')


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)
    
    # Now add the HTTP status code to the response.
    if response is not None:
        print(response)
        response.data['status_code'] = response.status_code
    else:
        response = Response(data=str(exc), status=status.HTTP_400_BAD_REQUEST)
        
    return response

class BookList(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__contains=title)
        return queryset
    
class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
            
