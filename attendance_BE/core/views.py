from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils.timezone import now
from .models import Attendance
from .serializers import AttendanceSerializer

# ✅ Check-in
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_in(request):
    user = request.user
    today = now().date()

    attendance, created = Attendance.objects.get_or_create(
        user=user, date=today
    )

    if attendance.check_in:
        return Response({'error': 'Already checked in today'}, status=400)

    attendance.check_in = now()
    attendance.save()

    return Response({'message': 'Checked in successfully'})


# ✅ Check-out
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_out(request):
    user = request.user
    today = now().date()

    try:
        attendance = Attendance.objects.get(user=user, date=today)
    except Attendance.DoesNotExist:
        return Response({'error': 'Check-in first'}, status=400)

    if attendance.check_out:
        return Response({'error': 'Already checked out'}, status=400)

    attendance.check_out = now()
    attendance.save()

    return Response({'message': 'Checked out successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def timesheet(request):
    user = request.user
    records = Attendance.objects.filter(user=user).order_by('-date')
    serializer = AttendanceSerializer(records, many=True)
    return Response(serializer.data)


from .models import Leave
from .serializers import LeaveSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_leave(request):
    data = request.data
    data['user'] = request.user.id

    serializer = LeaveSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def leave_list(request):
    leaves = Leave.objects.filter(user=request.user)
    serializer = LeaveSerializer(leaves, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def today_status(request):
    user = request.user
    today = now().date()

    try:
        attendance = Attendance.objects.get(user=user, date=today)

        if attendance.check_out:
            status = "Checked Out"
        elif attendance.check_in:
            status = "Checked In"
        else:
            status = "Not Checked In"

    except Attendance.DoesNotExist:
        status = "Not Checked In"

    return Response({"status": status})