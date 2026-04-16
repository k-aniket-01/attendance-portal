from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),           
    path('', include('attendance.urls')),
]

# React catch-all — must be last
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]