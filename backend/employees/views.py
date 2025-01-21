from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Employee,Event
from .serializers import EmployeeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
from django.db.models.functions import ExtractDay, ExtractMonth
from rest_framework.decorators import api_view, permission_classes
from .utils import get_team
from datetime import datetime
from django.db.models.query import QuerySet


class EventView(APIView):
    """
    API endpoint to process employee birthdays and work anniversaries
    if not already processed, and return all events with employee details.
    """

    def get(self, request):
        try:
            today = date.today()
            birthdays = Employee.objects.annotate(
                dob_day=ExtractDay('date_of_birth'),
                dob_month=ExtractMonth('date_of_birth')
            ).filter(dob_day=today.day, dob_month=today.month)
            for employee in birthdays:
                Event.objects.update_or_create(
                    employee=employee,
                    event_type="Birthday",
                    event_date=today,
                    defaults={
                        "employee_name": f"{employee.employee_first_name} {employee.employee_last_name}",
                        "employee_photo": employee.employee_photo,
                    },
                )

            # Handle work anniversaries using 'date_of_joining'
            work_anniversaries = Employee.objects.annotate(
                doj_day=ExtractDay('date_of_joining'),
                doj_month=ExtractMonth('date_of_joining')
            ).filter(doj_day=today.day, doj_month=today.month)
            for employee in work_anniversaries:
                Event.objects.update_or_create(
                    employee=employee,
                    event_type="Work Anniversary",
                    event_date=today,
                    defaults={
                        "employee_name": f"{employee.employee_first_name} {employee.employee_last_name}",
                        "employee_photo": employee.employee_photo,
                    },
                )

            events = Event.objects.filter(event_date=today)

            event_data = [
                {
                    "employee_name": event.employee_name,
                    "employee_photo": event.employee_photo.url if event.employee_photo else None,
                    "event_type": event.event_type,
                    "event_date": event.event_date,
                }
                for event in events
            ]

            return Response(event_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
            
            
class EmployeeViewSet(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk=None):
        if pk:
            try:
                employee = Employee.objects.get(user_id=pk)
                serializer = EmployeeSerializer(employee)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Employee.DoesNotExist:
                return Response({"error": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            employees = Employee.objects.all()
            serializer = EmployeeSerializer(employees, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_team_details(request):
    """
    Get employees with the same reporting manager as the authenticated user.
    """
    # input(request.user)
    response, status_code = get_team(request.user)
    if response["error"]:
        return Response({"error": response["error"]}, status=status_code)
    return Response(response["data"], status=status_code)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def team_celebrations(request):
    """
    Get birthdays and work anniversaries of the authenticated user's team.
    """
    response, status_code = get_team(request.user)
    if response["error"]:
        return Response({"error": response["error"]}, status=status_code)
    
    team_members = response["data"]

    today = date.today()

    birthdays = []
    work_anniversaries = []

    for employee in team_members:
        if employee.get("date_of_birth"):
            try:
                dob = datetime.strptime(employee["date_of_birth"], "%Y-%m-%d").date()
                if dob.day == today.day and dob.month == today.month:
                    birthdays.append({
                        "employee_name": employee["employee_first_name"] + " " + employee["employee_last_name"],
                        "employee_photo": employee["employee_photo"],
                        "event_type": "Birthday",
                        "event_date": today,
                    })
            except ValueError:
                pass  

        if employee.get("date_of_joining"):
            try:
                doj = datetime.strptime(employee["date_of_joining"], "%Y-%m-%d").date()
                if doj.day == today.day and doj.month == today.month:
                    work_anniversaries.append({
                        "employee_name": employee["employee_first_name"] + " " + employee["employee_last_name"],
                        "employee_photo": employee["employee_photo"],
                        "event_type": "Work Anniversary",
                        "event_date": today,
                    })
            except ValueError:
                pass  

    return Response(birthdays + work_anniversaries, status=status.HTTP_200_OK)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def team_member_counts(request):
    """
    Count total team members and the number of team members on leave today.
    """
    try:
        response, status_code = get_team(request.user)

        if response["error"]:
            return Response({"error": response["error"]}, status=status_code)
        
        team_members = response["data"]  # Assuming this is a queryset or a list
        
        total_team_members = team_members.count() if isinstance(team_members, QuerySet) else len(team_members)
       
        on_leave_count = sum(member["on_leave"] for member in team_members if isinstance(member, dict) and "on_leave" in member)

        return Response(
            {
                "total_team_members": total_team_members,
                "team_members_on_leave": on_leave_count,
            },
            status=status.HTTP_200_OK,
        )
    except Employee.DoesNotExist:
        return Response(
            {"error": "Authenticated user is not an employee."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {"error": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

def build_org_chart(employee):
    return {
        "id": employee.employee_user_id,
        "name": employee.employee_first_name,
        "label":employee.designation,
        "department": employee.departmant,
        "subordinates": [
            build_org_chart(subordinate) for subordinate in employee.subordinates.all()
        ],
    }
    
def organizational_chart_view(request, employee_id=None):
    if employee_id:
        employee = get_object_or_404(Employee, id=employee_id)
    else:
        employee = Employee.objects.filter(reporting_manager__isnull=True).first()  

    if not employee:
        return JsonResponse({"error": "No employee found"}, status=404)
    org_chart = build_org_chart(employee)
    return JsonResponse([org_chart], safe=False)