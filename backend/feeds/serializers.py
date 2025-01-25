from rest_framework import serializers
from .models import Announcement, Event, Post

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
        read_only_fields = ['id', 'created_by', 'created_at']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    like_count = serializers.IntegerField(source='like_count', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
