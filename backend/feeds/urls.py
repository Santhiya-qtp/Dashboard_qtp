from django.urls import path
from .views import AnnouncementListView, EventListView, FeedListView, LikeView, CommentView

urlpatterns = [
    path('announcements/', AnnouncementListView.as_view(), name='announcements'),
    path('events/', EventListView.as_view(), name='events'),
    path('feeds/', FeedListView.as_view(), name='feeds'),
    path('feed/<int:post_id>/like/', LikeView.as_view(), name='like'),
    path('feed/<int:post_id>/comment/', CommentView.as_view(), name='comment'),
]
