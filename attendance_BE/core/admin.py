from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Attendance, Leave


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'check_in', 'check_out')
    list_filter = ('date', 'user')
    search_fields = ('user__username',)


@admin.register(Leave)
class LeaveAdmin(admin.ModelAdmin):
    list_display = ('user', 'start_date', 'end_date', 'leave_type', 'status')
    list_filter = ('status', 'leave_type')
    search_fields = ('user__username',)