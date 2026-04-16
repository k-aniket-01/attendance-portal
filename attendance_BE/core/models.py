from django.contrib.auth.models import User
from django.db import models

class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    check_in = models.DateTimeField(null=True, blank=True)
    check_out = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.date}"


class Leave(models.Model):
    LEAVE_TYPES = (
        ('SICK', 'Sick'),
        ('CASUAL', 'Casual'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    leave_type = models.CharField(max_length=10, choices=LEAVE_TYPES)
    reason = models.TextField()
    status = models.CharField(max_length=10, default='PENDING')

    def __str__(self):
        return f"{self.user.username} - {self.status}"