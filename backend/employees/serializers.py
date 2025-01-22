from rest_framework import serializers
from .models import Employee
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class EmployeeSerializer(serializers.ModelSerializer):
    reporting_manager = serializers.CharField()  # Accepts a name, username, or ID

    class Meta:
        model = Employee
        fields = "__all__"

    def validate_reporting_manager(self, value):
        try:
            # Resolve the manager using a unique field like user_id, name, or email
            manager = Employee.objects.get(employee_first_name=value)
            return manager
        except Employee.DoesNotExist:
            raise serializers.ValidationError("Invalid reporting manager. No matching employee found.")

    def create(self, validated_data):
        # Replace `reporting_manager` with the resolved foreign key object
        reporting_manager = validated_data.pop("reporting_manager")
        employee = Employee.objects.create(**validated_data, reporting_manager=reporting_manager)
        return employee

    def update(self, instance, validated_data):
        # Handle updates for `reporting_manager`
        if "reporting_manager" in validated_data:
            reporting_manager = validated_data.pop("reporting_manager")
            instance.reporting_manager = reporting_manager
        return super().update(instance, validated_data)

   