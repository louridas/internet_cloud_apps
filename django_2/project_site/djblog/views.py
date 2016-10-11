from django.http import HttpResponse

def index(request):
    return HttpResponse("Helo, world. You are at the djblog index.")
