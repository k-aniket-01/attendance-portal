from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from django.utils.timezone import now
from .models import Attendance, Leave
from .serializer import AttendanceSerializer, LeaveSerializer


# JWT login view — no extra decorators needed
class MyTokenObtainPairView(TokenObtainPairView):
    pass


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_in(request):
    user = request.user
    today = now().date()

    if Attendance.objects.filter(user=user, date=today).exists():
        return Response(
            {"error": "Already checked in today"},
            status=status.HTTP_400_BAD_REQUEST
        )

    Attendance.objects.create(user=user, check_in=now())
    return Response(
        {"message": "Checked in successfully"},
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_out(request):
    user = request.user
    today = now().date()

    try:
        attendance = Attendance.objects.get(user=user, date=today)
    except Attendance.DoesNotExist:
        return Response(
            {"error": "No check-in found for today"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if attendance.check_out:
        return Response(
            {"error": "Already checked out"},
            status=status.HTTP_400_BAD_REQUEST
        )

    attendance.check_out = now()
    attendance.save()
    return Response({"message": "Checkout successful"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def timesheet(request):
    data = Attendance.objects.filter(user=request.user).order_by('-date')
    serializer = AttendanceSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_leave(request):
    serializer = LeaveSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_leaves(request):
    leaves = Leave.objects.filter(user=request.user).order_by('-id')
    serializer = LeaveSerializer(leaves, many=True)
    return Response(serializer.data)