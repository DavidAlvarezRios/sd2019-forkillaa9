"""PracticaWeb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
import django
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import login, logout

from rest_framework import routers

from PracticaWeb import settings
from forkilla import views


router = routers.DefaultRouter()
router.register(r'restaurants', views.RestaurantViewSet, basename='restaurants')
# Llista d'adreces amb les quals farem el comparator
listOfAddresses = ["sd2019-f4-forkilla", "sd2019-forkilla-a2"]



urlpatterns = [
    url(r'^forkilla/', include('forkilla.urls')),
    url(r'^comparator/$', views.comparator, {'ips': listOfAddresses}),
    url(r'^admin/', admin.site.urls),
    url(r'', include('forkilla.urls')),
    url(r'^accounts/login/$', login, name='login'),
    url(r'^accounts/logout/$', logout, {'next_page': '/forkilla/restaurants/'}, name='logout'),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^static/(?P<path>.*)$', django.views.static.serve, {'document_root': settings.STATIC_ROOT, 'show_indexes': settings.DEBUG}),
]

handler404 = views.handler404
handler500 = views.handler500

