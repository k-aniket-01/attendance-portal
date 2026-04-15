from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('', admin.site.urls),

    # API routes (important to keep above)
    path('', include('attendance.urls')),
]

# React frontend catch-all (LAST)
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]