from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from employees.views import EmployeeViewSet, EventView, get_team_details, team_celebrations,team_member_counts, organizational_chart_view
urlpatterns = [
    path('employees/', EmployeeViewSet.as_view(), name='employees'),
    path('employees/<int:pk>/', EmployeeViewSet.as_view(), name='employee-detail'),
    path('employee/event/', EventView.as_view(), name='process-employee-events'),
    path('employees/team/', get_team_details, name='get-team-details'), 
    path('employees/team/celebration/', team_celebrations, name='team_celebrations'),
    path('employees/team_count/', team_member_counts, name='team_count'),
    path('employees/chart/', organizational_chart_view, name='chart'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)