from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Announcement, Post, Event, Like, Comment
from .serializers import AnnouncementSerializer, PostSerializer, EventSerializer, LikeSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from employees.models import Employee



class FeedListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
            like, created = Like.objects.get_or_create(user=request.user, post=post)
            if not created:
                return Response({'detail': 'Already liked'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'detail': 'Post liked'}, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            return Response({'detail': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, post_id):
        try:
            like = Like.objects.get(user=request.user, post_id=post_id)
            like.delete()
            return Response({'detail': 'Like removed'}, status=status.HTTP_204_NO_CONTENT)
        except Like.DoesNotExist:
            return Response({'detail': 'Like not found'}, status=status.HTTP_404_NOT_FOUND)

class CommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user, post=post)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response({'detail': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)



class AnnouncementListView(APIView):
    def get(self, request):
        announcements = Announcement.objects.all().order_by('-created_at')
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = AnnouncementSerializer(data=request.data)

        if serializer.is_valid():
            announcement = serializer.save(created_by=request.user)

            user_details = Employee.objects.get(user=request.user)

            employee_name = f"{user_details.employee_first_name} {user_details.employee_last_name}"

            announcement.user_name = employee_name
            announcement.user_image = user_details.employee_photo.url if user_details.employee_photo else None

            announcement.save()  

            response_data = serializer.data
            response_data['user_name'] = employee_name
            response_data['user_image'] = user_details.employee_photo.url if user_details.employee_photo else None

            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class EventListView(APIView):
    def get(self, request):
        events = Event.objects.all().order_by('date', 'time')
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
