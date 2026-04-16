from django.urls import path
from .views import *

urlpatterns = [
    path('check-in/', check_in),
    path('check-out/', check_out),
    path('timesheet/', timesheet),
    path('apply-leave/', apply_leave),
    path('leaves/', leave_list),
    path('today-status/',today_status )
]