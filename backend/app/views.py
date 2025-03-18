from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Project, Sprint, Task
from .serializers import (
    ProjectSerializer,
    ProjectDetailsSerializer,
    SprintSerializer,
    TaskSerializer,
)
from rest_framework.permissions import IsAuthenticated


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()

    def get_serializer_class(self):
        if self.action == "details":
            return ProjectDetailsSerializer
        return ProjectSerializer

    @action(detail=True, methods=["get"])
    def details(self, request, pk=None):
        project = self.get_object()
        serializer = ProjectDetailsSerializer(project)
        return Response(serializer.data)


class SprintViewSet(viewsets.ModelViewSet):
    queryset = Sprint.objects.all()
    serializer_class = SprintSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
