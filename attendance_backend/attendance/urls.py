from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from .views import check_in, check_out, timesheet, apply_leave, get_leaves, MyTokenObtainPairView

urlpatterns = [
    path('api/login/', MyTokenObtainPairView.as_view()),
    path('api/checkin/', check_in),
    path('api/checkout/', check_out),
    path('api/timesheet/', timesheet),
    path('api/leave/', apply_leave),
    path('api/leaves/', get_leaves),


]