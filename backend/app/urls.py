from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ProjectViewSet, SprintViewSet, TaskViewSet
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

router = SimpleRouter(trailing_slash=False)
router.register(r"projects", ProjectViewSet)
router.register(r"sprints", SprintViewSet)
router.register(r"tasks", TaskViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"
    ),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
