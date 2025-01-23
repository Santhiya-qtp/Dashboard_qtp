from rest_framework import serializers
from .models import Employee
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class EmployeeSerializer(serializers.ModelSerializer):
    reporting_manager = serializers.CharField()
    user = serializers.CharField()  

    class Meta:
        model = Employee
        fields = "__all__"

    def validate_reporting_manager(self, value):
        try:
            manager = Employee.objects.get(employee_first_name=value)
            return manager
        except Employee.DoesNotExist:
            raise serializers.ValidationError("Invalid reporting manager. No matching employee found.")

    def validate_user(self, value):
        try:
            user = User.objects.get(username=value)  
            return user
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid user. No matching user found.")

    def create(self, validated_data):
        reporting_manager = validated_data.pop("reporting_manager")
        user = validated_data.pop("user")
        employee = Employee.objects.create(
            **validated_data, reporting_manager=reporting_manager, user=user
        )
        return employee

    def update(self, instance, validated_data):
        if "reporting_manager" in validated_data:
            reporting_manager = validated_data.pop("reporting_manager")
            instance.reporting_manager = reporting_manager
        if "user" in validated_data:
            user = validated_data.pop("user")
            instance.user = user
        return super().update(instance, validated_data)
