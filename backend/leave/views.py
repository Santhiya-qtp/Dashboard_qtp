from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Leave,LeaveBalance
from .serializers import LeaveSerializer
from employees.models import Employee
from holiday.models import Holiday
from rest_framework.views import APIView
from datetime import datetime, timedelta
import calendar
from datetime import datetime, timedelta, date
import json
from django.db.models import Q


class LeavesViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter leaves based on the logged-in user."""
        return Leave.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Override the create method to associate leave with the logged-in user."""
        serializer.save(user=self.request.user)
        
class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override this method to restrict users to their own leave applications.
        """
        return Leave.objects.filter(user_id=self.request.user.id)

    @action(detail=True, methods=['post'])
    def approve_leave(self, request, pk=None):
        """
        Custom action to approve or reject leave by the reporting manager.
        """
        try:
            leave = Leave.objects.get(id=pk)
        except Leave.DoesNotExist:
            return Response({'error': 'Leave not found'}, status=status.HTTP_404_NOT_FOUND)

        # Assuming `approved_by` is a field in your Leave model (e.g., a ForeignKey to the manager)
        if request.user != leave.approved_by:
            return Response({'error': 'You are not authorized to approve this leave.'}, status=status.HTTP_403_FORBIDDEN)

        action = request.data.get('action')
        input(action)
        if action not in ['Approved', 'Rejected']:
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        leave.status = action  # Assuming status is the field representing the approval state
        leave.save()  
        

        return Response({'message': f'Leave {action}'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_leave_data(self, request):
        """
        Custom action to get leave data for the authenticated user.
        """
        
        leave_data = Leave.objects.all()
       
        serialized_leave_data = LeaveSerializer(leave_data, many=True)
        return Response(serialized_leave_data.data)
    @action(detail=False, methods=['get'])
    def get_user_leave(self, request, pk=None):
        """
        Custom action to get leave data for the authenticated user.
        """       
        leave_data = Leave.objects.filter(user_id= pk).order_by('-leave_id')
        print(leave_data)
        serialized_leave_data = LeaveSerializer(leave_data, many=True)
        return Response(serialized_leave_data.data)
    
    @action(detail=False, methods=['delete'])
    def delete_leave_by_values(self, request, pk=None):
        """
        Custom action to delete a leave application by matching all provided field values.
        """
        
        
        try:
            # Filter the Leave records that match all the provided fields
            leave = Leave.objects.get(leave_id=pk)

           
            if not leave:
                return Response({'error': 'Leave record not found.'}, status=status.HTTP_404_NOT_FOUND)

            # print(request.user.is_staff)
            # if not request.user.is_staff:
            #     return Response({'detail': 'You are not authorized to delete this leave.'}, status=status.HTTP_403_FORBIDDEN)
            

            # Delete the leave record
            leave.delete()

            return Response({'message': 'Leave application deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

   
    @action(detail=True, methods=['get'])
    def get_leave_detail(self, request, pk=None):
        """
        Custom action to get the leave details for a specific leave by its ID.
        """

        try:
            leave = Leave.objects.get(leave_id=pk)
        except Leave.DoesNotExist:
            return Response({'error': 'Leave not found'}, status=status.HTTP_404_NOT_FOUND)

        serialized_leave_data = LeaveSerializer(leave)
        return Response(serialized_leave_data.data)

    @action(detail=False, methods=['post'])
    def submit_leave_form(self, request):
        """
        Custom action to submit a leave application form.
        Accepts leave details and creates a new leave record.
        """
        data = request.data
        from_process_date = datetime.strptime(data['fromDate'], "%Y-%m-%d")
        to_process_date = datetime.strptime(data['toDate'], "%Y-%m-%d")
        current_date = datetime.now()
        
        if from_process_date.date() < current_date.date() or to_process_date.date() < current_date.date():
            return Response({
                "error": "Leave cannot be applied for past dates.",
            }, status=status.HTTP_400_BAD_REQUEST)
            
        if  (from_process_date.weekday() == 6 and to_process_date .weekday() == 6) or (from_process_date == datetime(2024, 12, 25) and to_process_date == datetime(2024, 12, 25)):
            return Response({
                "error": "Leave cannot be applied on Holidays.",
            }, status=status.HTTP_400_BAD_REQUEST)
            
        employee = Employee.objects.get(employee_first_name = data['user_name']) 
        employee_id = employee.employee_id
        data['employee'] = employee_id
        print(data)
        total_leave_days = 0
        current_date  = from_process_date.date()
        to_date = to_process_date.date()
        time_period = data['time_period']
        holiday_queryset = Holiday.objects.all()
        # print(current_date, to_date)
        # input()
        holidays = [(holiday.day, holiday.month) for holiday in holiday_queryset]
        # print(holidays)
        while current_date <= to_date:
            # Check if the current day is not a Sunday and not a holiday
            is_sunday = current_date.weekday() == 6
            is_holiday = (current_date.day, current_date.month) in holidays
            
            if not is_sunday and not is_holiday:
                if time_period in ['firstHalf', 'secondHalf']:
                    total_leave_days += 0.5
                else:
                    total_leave_days += 1
            current_date += timedelta(days=1)
        # input(total_leave_days)
        

        # # Assume initial CL balance is 12 for the year
        # annual_cl_balance = 12
        # monthly_cl_limit = 3  # CL limit per month

        # # Get the current month and year
        # current_month = from_process_date.month
        # current_year = from_process_date.year

        # # Check if leave exceeds the available balance for the month
        # monthly_taken = leave_balance.month_leave_taken.get(current_month, 0)
        # if total_leave_days > monthly_cl_limit:
        #     lop = total_leave_days - monthly_cl_limit
        #     leave_balance.lop += lop  # Update LOP balance
        #     total_leave_days = monthly_cl_limit  # Cap leave taken to monthly limit
        # else:
        #     lop = 0  # No LOP if within the limit
        # input(total_leave_days)
        # # Deduct the leave days from the current year's balance
        # leave_balance.cl_balance -= total_leave_days
        # input(leave_balance.cl_balance)
        # # If the leave balance goes negative, set it to zero
        # if leave_balance.cl_balance < 0:
        #     leave_balance.cl_balance = 0

        # # Update the month_leave_taken for the current month
        # leave_balance.month_leave_taken[current_month] = monthly_taken + total_leave_days

        # # Check if the annual leave balance (CL) has exceeded the yearly limit
        # if leave_balance.cl_balance > annual_cl_balance:
        #     leave_balance.cl_balance = annual_cl_balance

        # leave_balance.save()
        data['leave_days'] = total_leave_days 
        serializer = LeaveSerializer(data=request.data)
        if serializer.is_valid():
            leave = serializer.save(user_id=request.user.id)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)  
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'])
    def update_leave(self, request, pk=None):
        """
        Custom action to update an existing leave application.
        """
        try:
            leave = Leave.objects.get(leave_id=pk)
        except Leave.DoesNotExist:
            return Response({'error': 'Leave not found'}, status=status.HTTP_404_NOT_FOUND)

        if leave.user_id != request.user.id and not request.user.is_staff:
            return Response({'error': 'You are not authorized to update this leave.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = LeaveSerializer(leave, data=request.data, partial=True)  # partial=True allows updating specific fields
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'])
    def approve_leave(self, request, pk=None):
        try:
            leave_request = Leave.objects.get(leave_id=pk)
            new_status = request.data.get("status")
            new_reason = request.data.get("reason")
            old_status = leave_request.status 
            print(old_status)
            if new_status in ["Approved", "Rejected"]:
                leave_request.status = new_status
                leave_request.reason = new_reason
                leave_request.save()
                monthly_limit = 3.0 
                ml_monthly_limit = 7.0
                print("***************")
                if old_status == 'Approved' and new_status == 'Rejected':
                    employee_id = leave_request.employee.employee_id
                    total_leave_days = leave_request.leave_days
                    from_process_date = leave_request.fromDate
                    month_name = calendar.month_name[from_process_date.month]

                    try:
                        leave_balance = LeaveBalance.objects.get(employee_id=employee_id)
                    except LeaveBalance.DoesNotExist:
                        return Response({'error': 'Leave balance not found for employee'}, status=status.HTTP_404_NOT_FOUND)

                    # Parse month_leave_taken
                    if isinstance(leave_balance.month_leave_taken, str):
                        leave_usage = json.loads(leave_balance.month_leave_taken)
                    elif isinstance(leave_balance.month_leave_taken, dict):
                        leave_usage = leave_balance.month_leave_taken
                    else:
                        leave_usage = {}

                    if month_name in leave_usage:
                        if leave_request.leave_type == 'Casual Leave':
                            cl_days_used = min(total_leave_days, monthly_limit)  # CL days capped at the monthly limit
                            lop_days_used = total_leave_days - cl_days_used  # Remaining days deducted as LOP
                            print(cl_days_used, lop_days_used)
                            leave_balance.cl_balance += cl_days_used
                            
                            leave_balance.lop = max(0, leave_balance.lop - lop_days_used)
                            
                            # Adjust the leave usage record for the month
                            leave_usage[month_name]['CL'] = max(0.0, leave_usage[month_name]['CL'] - total_leave_days)
                            
                        elif leave_request.leave_type == 'Medical Leave':
                            ml_days_used = min(total_leave_days, ml_monthly_limit)  # CL days capped at the monthly limit
                            lop_days_used = total_leave_days - ml_days_used  # Remaining days deducted as LOP
                            print(ml_days_used, lop_days_used)
                            leave_balance.ml_balance += ml_days_used
                            
                            leave_balance.lop = max(0, leave_balance.lop - lop_days_used)
                            
                            # Adjust the leave usage record for the month
                            leave_usage[month_name]['ML'] = max(0.0, leave_usage[month_name]['ML'] - total_leave_days)


                    # Save the updated leave balance and usage
                    leave_balance.month_leave_taken = json.dumps(leave_usage)
                    leave_balance.save()

                    # Update employee's `on_leave` status
                    employee = leave_request.employee
                    if employee.on_leave and leave_request.fromDate <= date.today() <= leave_request.toDate:
                        employee.on_leave = False
                        employee.save()

                    return Response({'message': 'Leave rejected and leave balance reverted.'}, status=status.HTTP_200_OK)
                
                elif new_status == 'Approved':
                    
                    employee_id = leave_request.employee.employee_id
                    from_process_date = leave_request.fromDate
                    to_process_date = leave_request.toDate
                    employee = leave_request.employee 
                    if from_process_date <= date.today() <= to_process_date:
                        employee.on_leave = True
                    else:
                        employee.on_leave = False
                    employee.save()
                    
                    total_leave_days = leave_request.leave_days
                    print("Leave_days", total_leave_days)
                    try:
                        leave_balance = LeaveBalance.objects.get(employee_id=employee_id)
                    except LeaveBalance.DoesNotExist:
                        return Response({'error': 'Leave balance not found for employee'}, status=status.HTTP_404_NOT_FOUND)

                    if isinstance(leave_balance.month_leave_taken, str):
                        leave_usage = json.loads(leave_balance.month_leave_taken)
                    elif isinstance(leave_balance.month_leave_taken, dict):
                        leave_usage = leave_balance.month_leave_taken
                    else:
                        leave_usage = {}
                    print("Parsed month_leave_taken:", leave_usage)
                    month_name = calendar.month_name[from_process_date.month]

                    if (month_name not in leave_usage) :
                        leave_usage[month_name] = {'CL': 0.0, 'ML': 0.0}
                    
                    total_leave_days = leave_request.leave_days
                    print(leave_usage)
                
                    if leave_request.leave_type == 'Casual Leave':
                        print("Before CL Update:", leave_usage[month_name]['CL'], total_leave_days)
                        leave_usage[month_name]['CL'] += total_leave_days
                        if leave_usage[month_name]['CL'] <= monthly_limit:
                            leave_balance.cl_balance -= total_leave_days
                        else:
                            cl_days = max(0, monthly_limit - (leave_usage[month_name]['CL'] - total_leave_days))
                            lop_days = total_leave_days - cl_days
                            leave_balance.cl_balance -= cl_days
                            leave_balance.lop += lop_days

                    elif leave_request.leave_type == 'Medical Leave':
                        leave_usage[month_name]['ML'] += total_leave_days
                        if leave_usage[month_name]['ML'] <= ml_monthly_limit:
                            leave_balance.ml_balance -= total_leave_days
                        else:
                            ml_days = max(0, ml_monthly_limit - (leave_usage[month_name]['ML'] - total_leave_days))
                            lop_days = total_leave_days - ml_days
                            leave_balance.ml_balance -= ml_days
                            leave_balance.lop += lop_days

                    leave_balance.month_leave_taken = json.dumps(leave_usage)
                    print("After Update:", leave_balance.cl_balance, leave_balance.ml_balance, leave_balance.month_leave_taken)

                    leave_balance.save()

                    return Response({'message': f'Leave {action} and leave balance updated.'}, status=status.HTTP_200_OK)
                return Response({"message": "Status updated successfully"}, status=status.HTTP_200_OK)
            
            else:
                return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
        except Leave.DoesNotExist:
            return Response({"error": "Leave request not found"},status=status.HTTP_400_BAD_REQUEST)
        


    
class LeaveCountView(APIView):
    def get(self, request, pk=None):
        employee = Employee.objects.get(user_id = pk) 
        leave_balance, created = LeaveBalance.objects.get_or_create(
            employee_id=employee.employee_id,
            defaults={
                'cl_balance': 12,
                'ml_balance': 7,
                'month_leave_taken': {},
                'lop': 0,
                'userid': request.user.id,
            }
        )
        try:
            leave_balance = LeaveBalance.objects.get(userid=pk)
            return Response({
                'cl': leave_balance.cl_balance,
                'ml': leave_balance.ml_balance,
                'lop': leave_balance.lop,
            })
        except LeaveBalance.DoesNotExist:
            return Response({'error': 'Leave balance not found for this employee.'}, status=404)
        


