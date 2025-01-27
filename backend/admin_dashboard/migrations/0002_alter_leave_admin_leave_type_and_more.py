# Generated by Django 5.1.4 on 2025-01-09 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leave_admin',
            name='leave_type',
            field=models.CharField(choices=[('Medical Leave', 'Medical Leave'), ('Casual Leave', 'Casual Leave'), ('Annual Leave', 'Annual Leave')], default='Casual Leave', max_length=50),
        ),
        migrations.AlterField(
            model_name='leave_admin_card',
            name='leave_type',
            field=models.CharField(choices=[('Medical Leave', 'Medical Leave'), ('Casual Leave', 'Casual Leave'), ('Annual Leave', 'Annual Leave')], default='Casual Leave', max_length=50),
        ),
    ]
