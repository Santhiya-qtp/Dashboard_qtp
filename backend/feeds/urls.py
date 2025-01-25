from django.urls import path
from .views import AnnouncementListView, EventListView, FeedListView

urlpatterns = [
    path('announcements/', AnnouncementListView.as_view(), name='announcements'),
    path('events/', EventListView.as_view(), name='events'),
    path('feeds/', FeedListView.as_view(), name='feeds'),
]
