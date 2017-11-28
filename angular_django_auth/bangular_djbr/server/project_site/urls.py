from django.conf.urls import url, include
from django.contrib import admin

from djbr import views

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^api/', include('djbr.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^api-token-auth/', obtain_jwt_token),    
]

urlpatterns += url(r'^(?P<path>.*)$', views.index),
