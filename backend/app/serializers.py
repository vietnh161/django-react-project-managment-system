from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import (
    Project,
    ProjectMember,
    Task,
    Sprint,
    Tag,
    KanbanColumn,
    UserProfile,
)


class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "image"]

    def get_image(self, obj):
        try:
            return obj.profile.image
        except UserProfile.DoesNotExist:
            return None


class ProjectMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ProjectMember
        fields = ["id", "user", "joined_at"]


class KanbanColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanColumn
        fields = ["id", "name", "position"]


class SprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprint
        fields = ["id", "name", "is_active", "start_date", "end_date"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    kanban_column = KanbanColumnSerializer(read_only=True)
    sprint = SprintSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    subtasks = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "assigned_to",
            "kanban_column",
            "sprint",
            "parent",
            "tags",
            "status",
            "deadline",
            "created_at",
            "priority",
            "type",
            "project",
            "subtasks",
        ]

    def get_subtasks(self, obj):
        subtasks = Task.objects.filter(parent=obj)
        return [subtask.id for subtask in subtasks]


class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Project
        fields = "__all__"


class ProjectDetailsSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    members = ProjectMemberSerializer(many=True, read_only=True, source="members.all")
    sprints = SprintSerializer(many=True, read_only=True, source="sprints.all")
    kanban_columns = KanbanColumnSerializer(
        many=True, read_only=True, source="kanban_columns.all"
    )
    tags = TagSerializer(many=True, read_only=True, source="tags.all")
    tasks = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "owner",
            "created_at",
            "members",
            "tasks",
            "sprints",
            "kanban_columns",
            "tags",
        ]

    def get_tasks(self, obj):
        active_sprint = obj.sprints.filter(is_active=True).first()

        if active_sprint:
            tasks = obj.tasks.filter(sprint=active_sprint)
            return TaskSerializer(tasks, many=True).data
        return []
