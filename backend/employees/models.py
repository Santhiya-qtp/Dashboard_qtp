from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from django.conf import settings


class Employee(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="employees", 
        null=True, 
        blank=True
    ) 
    employee_id = models.AutoField(primary_key=True) 
    employee_user_id = models.CharField(max_length=200)
    Salutation = models.CharField(max_length=50, blank=True, null=True)
    employee_first_name = models.CharField(
        max_length=200, null=False, 
    )
    employee_last_name = models.CharField(
        max_length=200, null=True, blank=True, 
    )
    email = models.EmailField(max_length=254, unique=True)
    contact_number = models.CharField(
        max_length=15,
    )
    address = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=30, blank=True, null=True)
    state = models.CharField(max_length=30, null=True, blank=True)
    city = models.CharField(max_length=30, null=True, blank=True)
    zip = models.CharField(max_length=20, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10, 
    )
    qualification = models.CharField(max_length=50, blank=True, null=True)
    experience = models.IntegerField(null=True, blank=True)
    marital_status = models.CharField(
        max_length=50, 
    )
    Workstream = models.CharField(max_length=100, blank=True, null=True)
    emergency_contact = models.CharField(max_length=15, null=True, blank=True)
    emergency_contact_name = models.CharField(max_length=20, null=True, blank=True)
    emergency_contact_relation = models.CharField(max_length=20, null=True, blank=True)
    departmant = models.CharField(max_length=100,null=True)
    reporting_manager = models.ForeignKey(
        'self', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='subordinates'
    )
    designation = models.CharField(max_length=100, null=True)
    date_of_joining = models.DateField(null=True,blank=True)
    employee_photo = models.ImageField(
        upload_to='employee_photos/', 
        null=True, 
        blank=True
    )
    on_leave = models.BooleanField(default=False) 

    def get_full_name(self):
        """
        Method will return employee full name
        """
        return (
            f"{self.employee_first_name } {self.employee_last_name}"
            if self.employee_last_name
            else self.employee_first_name
        )
    @property
    def photo_url(self):
        """
        Returns the full URL of the employee photo.
        """
        if self.employee_photo:
            return f"{settings.MEDIA_URL}{self.employee_photo}"
        return None
    
    def __str__(self):
        return self.employee_first_name
    
    
class Event(models.Model):
    EVENT_TYPES = (
        ('Birthday', 'Birthday'),
        ('Work Anniversary', 'Work Anniversary'),
    )
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="events")
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES)
    event_date = models.DateField()
    employee_name = models.CharField(max_length=255) 
    employee_photo = models.ImageField(upload_to='event_photos/', null=True, blank=True)

